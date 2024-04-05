'use server'

import User from '@/database/user.model'
import { revalidatePath } from 'next/cache'
import Question from '@/database/question.model'
import { connectToDatabase } from '@/lib/mongoose'

import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  UpdateUserParams,
} from './shared.types'

export async function getUserById(params: any) {
  try {
    await connectToDatabase()

    const { userId } = params

    const user = await User.findOne({ clerkId: userId })

    return user
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase()

    const newUser = await User.create(userData)

    return newUser
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase()

    const { clerkId, updateData, path } = params

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase()

    const { clerkId } = params

    const user = await User.findOneAndDelete({ clerkId })

    if (!user) throw new Error('User not found')

    // Delete user from database and its questions, answers, comments

    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   '_id'
    // )

    await Question.deleteMany({ author: user._id })

    // TODO: delete user answers

    // const deletedUser = await User.findByIdAndDelete(user._id)

    return deleteUser
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    await connectToDatabase()

    // const { page = 1, pageSize = 20, filter, searchQuery } = params

    const users = await User.find({}).sort({ createdAt: -1 })

    return { users }
  } catch (error) {
    console.error(error)
    throw error
  }
}
