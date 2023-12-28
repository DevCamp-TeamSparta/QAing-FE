'use client'
import Cookies from 'js-cookie'
import { fetchUser } from '@/services/auth/auth.api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { EditUserType } from '@/types/userStore.types'
import { setAmplitudeUserId } from '@/lib/amplitude'
import useAdvancedSignup from '@/hooks/useAdvancedSignup'
import { useUserStore } from '@/states/user-store/userStore'

function Page() {
  const [folderList, setFolderList] = useState()
  const [getCookie, setGetCookie] = useState<string | undefined>()
  const { isAdvancedSignup } = useAdvancedSignup()
  const [user, setUser] = useState<EditUserType>({
    userName: 'undefined',
    userPhoneNumber: 1234567890,
    userJob: 'undefined',
    userTeamsize: 'undefined',
    userCompany: 'undefined',
  })
  const {
    setAccessToken,
    setRefreshToken,
    setRegisterUser,
    accessToken,
    refreshToken,
  } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    fetchUser()
      .then(data => {
        console.log('콜백 유저정보', data)
        setAmplitudeUserId(data.userEmail)
        setUser({
          userName: data.userName,
          userPhoneNumber: data.userPhoneNumber,
          userJob: data.userJob,
          userTeamsize: data.userTeamsize,
          userCompany: data.userCompany,
        })
        if (!data.accessToken || !data.refreshToken) return
        setAccessToken(data.accessToken)
        isAdvancedSignup(data)
      })
      .catch(e => {
        console.error(e)
        window.location.href = 'https://qaing.co/404'
      })
  }, [])

  useEffect(() => {
    router.push('/')
  }, [accessToken])

  // const tokenhandler = () => {
  //   Cookies.remove('refreshToken')
  //   Cookies.remove('accessToken')
  //   console.log('토큰제거')
  // }

  return (
    <div className="flex flex-col mb-2 items-center">
      {/* <button
        className="bg-gray-200 w-[200px] h-[50px] rounded-lg mb-2"
        onClick={tokenhandler}
      >
        remove cookie
      </button> */}
      {/* <button
        className="bg-gray-200 w-[200px] h-[50px] rounded-lg"
        // onClick={apiTest}
      >
        api test Button
      </button> */}
    </div>
  )
}

export default Page
