import React from 'react'
import { useEffect } from 'react'

function Custom404() {
  useEffect(() => {
    window.location.href = 'https://qaing.co/404'
  }, [])
  return <div>404</div>
}

export default Custom404
