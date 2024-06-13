'use server'

import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from '@/lib/actions/shared.types'
import { connectToDatabase } from '@/lib/mongoose'
import User from '@/database/user.model'
import Tag, { ITag } from '@/database/tag.model'
import { FilterQuery } from 'mongoose'
import Question from '@/database/question.model'

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase()

    const { userId = 3 } = params

    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')

    // Find interactions fot the user and grouped by tags
    // Interactions

    return [
      { _id: '1', name: 'css' },
      { _id: '2', name: 'react' },
    ]
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase()

    const tags = await Tag.find({})

    return { tags }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase()

    const { tagId, page = 1, pageSize = 10, searchQuery } = params
    const skipAmount = (page - 1) * pageSize

    const tagFilter: FilterQuery<ITag> = { _id: tagId }

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1, // +1 to check if there is next page
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' },
      ],
    })

    if (!tag) {
      throw new Error('Tag not found')
    }

    const isNext = tag.questions.length > pageSize

    const questions = tag.questions

    return { tagTitle: tag.name, questions, isNext }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getHotTags() {
  try {
    await connectToDatabase()

    const tags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: '$questions' } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ])

    return tags
  } catch (error) {
    console.error(error)
    throw error
  }
}
