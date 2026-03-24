import { z } from "zod"

export const blogCommentSchema = z.object({
  authorName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be 80 characters or less"),
  authorEmail: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(120, "Email must be 120 characters or less"),
  content: z
    .string()
    .trim()
    .min(6, "Comment must be at least 6 characters")
    .max(1200, "Comment must be 1200 characters or less"),
})

export type BlogCommentFormValues = z.infer<typeof blogCommentSchema>
