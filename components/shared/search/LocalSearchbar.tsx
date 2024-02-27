'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import { Input } from '@/components/ui/input'

interface CustomInputProps {
  route: string
  iconPosition: 'left' | 'right'
  imgSrc: string
  placeholder: string
  otherClasses?: string
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  const [search, setSearch] = useState('')

  return (
    <div
      className={`background-light800_darkgradient flex ${
        iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse'
      } min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      <Image
        src={imgSrc}
        alt="search icon"
        width={24}
        height={24}
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
      />
    </div>
  )
}

export default LocalSearchbar