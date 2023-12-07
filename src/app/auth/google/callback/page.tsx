'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useUserStore from '@/states/user-store/userStore'
import Cookies from 'js-cookie'
import axios from 'axios'

function Page() {
  const GoogleURL = process.env.NEXT_PUBLIC_GOOGLE_URL
  const router = useRouter()
  const { user, setUser } = useUserStore()
  // useEffect(() => {
  //   if (!user) return
  //   if (user === null) {
  //     router.push('/')
  //   }
  // })

  useEffect(() => {
    try {
      axios.get(`${GoogleURL}/auth/google`).then(res => {
        console.log('구글로그인 요청', res)
        const resData = res.data
        setUser(resData)
      })
    } catch (err) {
      console.log('소셜로그인 실패', err)
    }
  }, [])

  return <div>page</div>
}

export default Page
