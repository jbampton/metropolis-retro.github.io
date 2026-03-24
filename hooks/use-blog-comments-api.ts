"use client"

import { useCallback, useState } from "react"
import type { BlogCommentFormValues } from "@/lib/validators/blog-comment"

export type BlogComment = {
  id: string
  postSlug: string
  authorName: string
  content: string
  createdAt: string
}

type BlogCommentsState = {
  comments: BlogComment[]
  isLoading: boolean
  isSubmitting: boolean
  isError: boolean
  error: string | null
  successMessage: string | null
}

const initialState: BlogCommentsState = {
  comments: [],
  isLoading: false,
  isSubmitting: false,
  isError: false,
  error: null,
  successMessage: null,
}

export function useBlogCommentsApi(postSlug: string) {
  const [state, setState] = useState<BlogCommentsState>(initialState)

  const loadComments = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      isError: false,
      error: null,
    }))

    try {
      const response = await fetch(`/api/blog/${postSlug}/comments`, {
        method: "GET",
        cache: "no-store",
      })

      const data = (await response.json()) as {
        comments?: BlogComment[]
        error?: string
      }

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to load comments")
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        comments: data.comments ?? [],
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isError: true,
        error: error instanceof Error ? error.message : "Unable to load comments",
      }))
    }
  }, [postSlug])

  const submitComment = useCallback(
    async (payload: BlogCommentFormValues) => {
      setState((prev) => ({
        ...prev,
        isSubmitting: true,
        isError: false,
        error: null,
        successMessage: null,
      }))

      try {
        const response = await fetch(`/api/blog/${postSlug}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })

        const data = (await response.json()) as {
          message?: string
          error?: string
          comment?: BlogComment
          comments?: BlogComment[]
        }

        if (!response.ok) {
          throw new Error(data.error ?? "Unable to publish comment")
        }

        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          comments: data.comments ?? (data.comment ? [data.comment, ...prev.comments] : prev.comments),
          successMessage: data.message ?? "Comment published successfully.",
        }))

        return { ok: true as const }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          isError: true,
          error: error instanceof Error ? error.message : "Unable to publish comment",
        }))

        return { ok: false as const }
      }
    },
    [postSlug],
  )

  const resetFeedback = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isError: false,
      error: null,
      successMessage: null,
    }))
  }, [])

  return {
    ...state,
    loadComments,
    submitComment,
    resetFeedback,
  }
}
