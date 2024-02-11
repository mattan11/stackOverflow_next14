'use server'

import { connectToDatabase } from '@/lib/mongoose'
import { z } from 'zod'
import { QuestionsSchema } from '@/lib/validations'

export async function createQuestion(params: z.infer<typeof QuestionsSchema>) {
  try {
    connectToDatabase()
  } catch (error) {
    console.error(error)
  }
}
