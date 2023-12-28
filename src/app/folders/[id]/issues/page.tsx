import React from 'react'
import IssuePageTemplete from '@/components/templetes/IssuePageTemplete/IssueTemplete'
import { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
  },
}

function page() {
  return (
    <div>
      <IssuePageTemplete />
    </div>
  )
}

export default page
