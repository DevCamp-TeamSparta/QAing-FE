'use client'
import { useEffect } from 'react'

function Custom404() {
  useEffect(() => {
    window.location.href = 'https://qaing.co/404'
  }, [])
  return <div></div>
}

export default Custom404
