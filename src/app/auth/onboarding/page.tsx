import React from 'react'
import OnboardingTemplete from '@/components/templetes/AuthTemplete/OnboardingTemplete'
import { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
  },
}

function Page() {
  return (
    <div className="h-[1230px]">
      <OnboardingTemplete />
    </div>
  )
}

export default Page
