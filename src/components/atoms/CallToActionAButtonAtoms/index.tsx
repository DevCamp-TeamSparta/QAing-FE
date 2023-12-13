import React, { ReactNode } from 'react'
import clsx from 'clsx'

type CTAButtonProps = {
  size: 'small' | 'medium' | 'large'
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function CTAButton({
  size,
  className,
  disabled,
  onClick,
  children,
}: CTAButtonProps) {
  return (
    <button
      type="submit"
      className={clsx(
        `${className} rounded-[99px] bg-brand-default text-white 
          focus:outline-none 
          hover:bg-brand-hover 
          active:bg-brand-pressed 
          disabled:bg-gray-400 disabled:cursor-not-allowed 
          t3
          `,
        {
          'w-[440px] h-[56px]': size === 'large',
          'w-[208px] h-[56px]': size === 'medium',
          b3: size === 'small',
        },
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
