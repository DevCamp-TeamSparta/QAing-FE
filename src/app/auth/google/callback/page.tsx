'use client'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import axios from 'axios'

function Page() {
  // const cookieValue = Cookies.get('jwt')
  const GoogleURL = process.env.NEXT_PUBLIC_GOOGLE_URL

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://test.qaing.co/auth/check', {
  //         withCredentials: true,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //       const data = response.data
  //       console.log(data)
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }
  //   fetchData()
  // }, [])

  return <div>page</div>
}

export default Page
