import React from 'react'

export const TextLink = ({ link, text }: { link: string; text: string }) => {
  return (
    <p className="text-lg text-gray-200 sm:text-sm">
      <a href={link}>{text}</a>
    </p>
  )
}
