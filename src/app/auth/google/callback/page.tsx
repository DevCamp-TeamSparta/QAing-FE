'use client'
import Cookies from 'js-cookie'
import { fetchUser } from '@/services/auth/auth.api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { EditUserType } from '@/types/userStore.types'

function Page() {
  const [folderList, setFolderList] = useState()
  const [getCookie, setGetCookie] = useState<string | undefined>()
  const [user, setUser] = useState<EditUserType>({
    userName: 'undefined',
    userPhoneNumber: 1234567890,
    userJob: 'undefined',
    userTeamsize: 'undefined',
    userCompany: 'undefined',
  })
  // const cookieStore = cookies()
  // console.log('cookieStore', cookieStore)
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL
  const accessToken = 'Token is here'
  const CookieGet = () => {
    const cookie = Cookies.get('access-token')
    setGetCookie(cookie)
  }
  const CookieGetVariable = Cookies.get('access-token')

  const tokenHandler = () => {
    // console.log('확인')
    Cookies.set('access-token', accessToken)
  }
  const router = useRouter()

  useEffect(() => {
    CookieGet()
    fetchUser()
      .then(data => {
        console.log('콜백 유저정보', data)
        setUser({
          userName: data.userName,
          userPhoneNumber: data.userPhoneNumber,
          userJob: data.userJob,
          userTeamsize: data.userTeamsize,
          userCompany: data.userCompany,
        })
      })
      .catch(e => console.error(e))
  }, [])

  useEffect(() => {
    // window.location.href = 'https://qaing.co'
    const isAdvancedSignup = () => {
      if (
        user.userName === null ||
        user.userPhoneNumber === null ||
        user.userJob === null ||
        user.userCompany === null
      ) {
        router.push('/auth/onboarding')
      }
    }
    isAdvancedSignup()
    // router.push('/')
    console.log('CookieGetVariable', CookieGetVariable)
    console.log('getCookie', getCookie)
  }, [getCookie, user])

  return (
    <div className="flex flex-col mb-2 items-center">
      {/* <button
        className="bg-gray-200 w-[200px] h-[50px] rounded-lg mb-2"
        onClick={tokenhandler}
      >
        set cookie
      </button>
      <button
        className="bg-gray-200 w-[200px] h-[50px] rounded-lg"
        // onClick={apiTest}
      >
        api test Button
      </button> */}
    </div>
  )
}

export default Page
