'use server'

import {
  GetAllTagsParams,
  GetTopInteractedTagsParams,
} from '@/lib/actions/shared.types'
import { connectToDatabase } from '@/lib/mongoose'
import User from '@/database/user.model'
import Tag from '@/database/tag.model'

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
