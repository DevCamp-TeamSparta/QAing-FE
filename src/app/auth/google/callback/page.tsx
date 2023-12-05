'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useUserStore from '@/states/user-store/userStore'

function Page() {
  const router = useRouter()
  const { user } = useUserStore()
  useEffect(() => {
    if (!user) return
    if (user === null) {
      router.push('/')
    }
  })

  return <div>page</div>
}

export default Page
