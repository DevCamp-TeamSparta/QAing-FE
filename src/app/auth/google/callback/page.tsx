'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useUserStore from '@/states/user-store/userStore'
import Cookies from 'js-cookie'

function Page() {
  const router = useRouter()
  const { user } = useUserStore()
  useEffect(() => {
    if (!user) return
    if (user === null) {
      router.push('/')
    }
  })

  useEffect(() => {
    const userDataString = Cookies.get('userData')
    if (userDataString) {
      const userData = JSON.parse(userDataString)
      console.log('유저 정보:', userData)
    } else {
      console.log('userData 쿠키를 찾을 수 없습니다.')
    }
  }, [])

  return <div>page</div>
}

export default Page
