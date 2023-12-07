'use client'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

function Page() {
  const cookieValue = Cookies.get('jwt')
  useEffect(() => {
    console.log('쿠키', cookieValue)
  }),
    []

  return <div>page</div>
}

export default Page
