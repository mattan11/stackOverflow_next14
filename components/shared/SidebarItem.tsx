import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const SidebarItem = (props: {
  item: { route: string; imgURL: string; label: string }
  active: boolean
  mobile?: boolean
}) => {
  return (
    <Link
      href={props.item.route}
      className={`${
        props.active
          ? 'primary-gradient rounded-lg text-light-900'
          : 'text-dark300_light900'
      } flex items-center justify-start gap-4 bg-transparent p-4`}
    >
      <Image
        src={props.item.imgURL}
        alt={props.item.label}
        width={20}
        height={20}
        className={`${props.active ? '' : 'invert-colors'}`}
      />
      <p
        className={`${props.active ? 'base-bold' : 'base-medium'} ${
          props.mobile ? '' : 'max-lg:hidden'
        } `}
      >
        {props.item.label}
      </p>
    </Link>
  )
}

export default SidebarItem
