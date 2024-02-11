'use server'

import { connectToDatabase } from '@/lib/mongoose'
import Question from '@/database/question.model'
import Tag from '@/database/tag.model'

export async function createQuestion(params: any) {
  try {
    connectToDatabase()

    const { title, content, tags, author, path } = params

    // Create question
    const question = await Question.create({
      title,
      content,
      author,
    })

    const tagDocuments = []

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      )

      tagDocuments.push(existingTag._id)
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    })
  } catch (error) {
    console.error(error)
  }
}
