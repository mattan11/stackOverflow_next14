import React from 'react'
import Question from '@/components/forms/Question'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { getUserById } from '@/lib/actions/user.action'
import { log } from 'console'

const AskQuestion = async () => {
  // const { userId } = auth()

  const userId = '123456789'

  if (!userId) redirect('/sign-in')

  const mongoUser = await getUserById({ userId })

  return (
    <div>
      <div>
        <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

        <div className="mt-9">
          <Question mongoUserId={JSON.stringify(mongoUser._id)} />
        </div>
      </div>
    </div>
  )
}

export default AskQuestion