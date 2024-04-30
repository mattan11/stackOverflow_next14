import {z} from 'zod'

export const TAG_MAX_LENGTH = 15

export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(30),
  tags: z.array(z.string().min(1).max(TAG_MAX_LENGTH)).min(1).max(3),
})

export const AnswerSchema = z.object({
  answer: z.string().min(100)
})

export const ProfileSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  bio: z.string().min(10).max(150),
  portfolioWebsite: z.string().url(),
  location: z.string().min(5).max(50),
})