import { NextResponse } from "next/server"
import { getBlogPostBySlug } from "@/lib/content/blog-posts"
import { blogCommentSchema } from "@/lib/validators/blog-comment"

type RouteContext = {
  params: Promise<{ slug: string }>
}

type StoredComment = {
  id: string
  postSlug: string
  authorName: string
  authorEmail: string
  content: string
  createdAt: string
}

type PublicComment = {
  id: string
  postSlug: string
  authorName: string
  content: string
  createdAt: string
}

const commentsStore: Record<string, StoredComment[]> = {}

function toPublicComment(comment: StoredComment): PublicComment {
  return {
    id: comment.id,
    postSlug: comment.postSlug,
    authorName: comment.authorName,
    content: comment.content,
    createdAt: comment.createdAt,
  }
}

export async function GET(_: Request, context: RouteContext) {
  const { slug } = await context.params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return NextResponse.json(
      {
        error: "Post not found",
      },
      { status: 404 },
    )
  }

  const comments = (commentsStore[slug] ?? []).map(toPublicComment)

  return NextResponse.json(
    {
      comments,
    },
    { status: 200 },
  )
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params
    const post = getBlogPostBySlug(slug)

    if (!post) {
      return NextResponse.json(
        {
          error: "Post not found",
        },
        { status: 404 },
      )
    }

    const json = await request.json()
    const parsed = blogCommentSchema.safeParse(json)

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]

      return NextResponse.json(
        {
          error: firstIssue?.message ?? "Invalid comment data",
        },
        { status: 400 },
      )
    }

    const createdComment: StoredComment = {
      id: crypto.randomUUID(),
      postSlug: slug,
      authorName: parsed.data.authorName,
      authorEmail: parsed.data.authorEmail,
      content: parsed.data.content,
      createdAt: new Date().toISOString(),
    }

    commentsStore[slug] = [createdComment, ...(commentsStore[slug] ?? [])]

    return NextResponse.json(
      {
        message: "Comment posted successfully.",
        comment: toPublicComment(createdComment),
        comments: commentsStore[slug].map(toPublicComment),
      },
      { status: 201 },
    )
  } catch {
    return NextResponse.json(
      {
        error: "Unable to process your comment. Please try again.",
      },
      { status: 500 },
    )
  }
}
