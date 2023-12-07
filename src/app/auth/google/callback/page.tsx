'use client'
import Cookies from 'js-cookie'
import { cookies } from 'next/headers'
import { useEffect } from 'react'
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'
import { useQueries } from 'react-query'
// import { getServerSideProps } from 'next/dist/build/templates/pages'

function Page() {
  const params = useSearchParams()
  useEffect(() => {
    const jwt = params.jwt
    console.log(jwt)
    if (!jwt) return

    Cookies.set('access-token', jwt)
    axios
      .get('https://test.qaing.co/auth/goole/check', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then(res => {
        console.log(res)
      })
  }, [params])

  return <div>page</div>
}

export default Page
