import React from 'react'
import Router from 'next/router'

function page() {
  const router = Router
  router.push('/')
  return <div>page</div>
}

export default page
