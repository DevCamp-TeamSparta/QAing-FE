import React, { ReactNode } from 'react'
import clsx from 'clsx'

type CTAButtonProps = {
  size: 'small' | 'medium' | 'large'
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export default function CTAButton({
  size,
  className,
  disabled,
  onClick,
  children,
}: CTAButtonProps) {
  return (
    <button
      className={clsx(
        `${className} rounded-[99px] bg-primary-default 
          focus:outline-none 
          hover:bg-primary-hover 
          active:bg-primary-pressed 
          disabled:bg-gray-400 disabled:cursor-not-allowed 
          cursor-pointer
          text-white
          t3
          `,
        {
          'w-[440px] h-[56px]': size === 'large',
          'w-[208px] h-[56px]': size === 'medium',
          b3: size === 'small',
        },
      )}
      disabled={false}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
