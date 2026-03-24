"use client"

import { useEffect, useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2, MessageSquare, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useBlogCommentsApi } from "@/hooks/use-blog-comments-api"
import { blogCommentSchema, type BlogCommentFormValues } from "@/lib/validators/blog-comment"

const defaultValues: BlogCommentFormValues = {
  authorName: "",
  authorEmail: "",
  content: "",
}

function formatCommentDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

type CommentsSectionProps = {
  postSlug: string
}

export function CommentsSection({ postSlug }: CommentsSectionProps) {
  const {
    comments,
    isLoading,
    isSubmitting,
    isError,
    error,
    successMessage,
    loadComments,
    submitComment,
    resetFeedback,
  } = useBlogCommentsApi(postSlug)

  const form = useForm<BlogCommentFormValues>({
    resolver: zodResolver(blogCommentSchema),
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onChange",
  })

  useEffect(() => {
    void loadComments()
  }, [loadComments])

  const contentLength = form.watch("content")?.length ?? 0

  const statusTone = useMemo(() => {
    if (successMessage) {
      return "text-emerald-700 bg-emerald-50 border-emerald-200"
    }

    if (isError) {
      return "text-red-700 bg-red-50 border-red-200"
    }

    return ""
  }, [isError, successMessage])

  const onSubmit = async (values: BlogCommentFormValues) => {
    const result = await submitComment(values)

    if (result.ok) {
      form.reset(defaultValues)
    }
  }

  return (
    <section className="mt-16 rounded-3xl border border-border bg-card p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl tracking-tight">Comments</h2>
          <p className="mt-2 text-sm text-muted-foreground">Share your ideas, questions, or analysis about this post.</p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            resetFeedback()
            void loadComments()
          }}
          disabled={isLoading}
          className="rounded-full"
        >
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
          Refresh
        </Button>
      </div>

      {(successMessage || isError) && (
        <div className={`mt-6 rounded-xl border px-4 py-3 text-sm ${statusTone}`}>
          {successMessage ?? error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="authorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Chess player name"
                      disabled={isSubmitting}
                      {...field}
                      onChange={(event) => {
                        field.onChange(event)
                        if (successMessage || isError) {
                          resetFeedback()
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authorEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      disabled={isSubmitting}
                      {...field}
                      onChange={(event) => {
                        field.onChange(event)
                        if (successMessage || isError) {
                          resetFeedback()
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your comment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your thoughts about this post..."
                    rows={5}
                    maxLength={1200}
                    disabled={isSubmitting}
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      if (successMessage || isError) {
                        resetFeedback()
                      }
                    }}
                  />
                </FormControl>
                <div className="flex items-center justify-between">
                  <FormMessage />
                  <span className="text-xs text-muted-foreground">{contentLength}/1200</span>
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full px-7"
            style={{
              background: "linear-gradient(135deg, #203eec 0%, #00d4ff 100%)",
              boxShadow: "0 4px 20px rgba(32, 62, 236, 0.3)",
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Publishing...
              </>
            ) : (
              "Post Comment"
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-10 space-y-4">
        {isLoading && comments.length === 0 ? (
          <div className="rounded-2xl border border-border bg-secondary/30 px-5 py-4 text-sm text-muted-foreground">
            Loading comments...
          </div>
        ) : comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-secondary/20 px-5 py-8 text-center text-sm text-muted-foreground">
            <MessageSquare className="mx-auto mb-3 size-5" />
            No comments yet. Be the first to start the conversation.
          </div>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className="rounded-2xl border border-border bg-background px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold tracking-tight">{comment.authorName}</p>
                <p className="text-xs text-muted-foreground">{formatCommentDate(comment.createdAt)}</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{comment.content}</p>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
