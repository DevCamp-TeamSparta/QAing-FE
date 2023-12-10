'use client'
// import { cookies } from 'next/headers'
// import { getServerSideProps } from 'next/dist/build/templates/pages'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useEffect } from 'react'

function Page() {
  // const cookieStore = cookies()
  // console.log('cookieStore', cookieStore)
  const baseURL = process.env.NEXT_PUBLIC_GOOGLE_URL
  const accessToken = 'Token is here'
  const getCookie = Cookies.get('access-token')
  console.log('getCookie', getCookie)
  const tokenhandler = () => {
    console.log('확인')
    Cookies.set('access-token', accessToken)
  }

  const apiTest = async () => {
    try {
      const UpdateUserDto = { userName: 'IamGroot' }
      const data = await axios
        .put(`${baseURL}/users/profile`, UpdateUserDto, {
          withCredentials: true,
        })
        .then(res => {
          console.log('res.data', res.data)
        })
    } catch (err) {
      console.log('err', err)
    }
  }

  useEffect(() => {
    // window.location.href = 'https://qaing.co'
    console.log('getCookie', getCookie)
  })

  return (
    <div className="flex flex-col mb-2 items-center">
      <button
        className="bg-gray-200 w-[200px] h-[50px] rounded-lg mb-2"
        onClick={tokenhandler}
      >
        set cookie
      </button>
      <button
        className="bg-gray-200 w-[200px] h-[50px] rounded-lg"
        onClick={apiTest}
      >
        api test Button
      </button>
    </div>
  )
}

export default Page
