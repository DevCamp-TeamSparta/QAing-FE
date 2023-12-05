import axios from 'axios'
import { MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import useUserStore from '@/states/user-store/userStore'

const GoogleSignup = (e: MouseEvent<HTMLButtonElement>) => {
  const router = useRouter()
  const GoogleURL = process.env.NEXT_PUBLIC_GOOGLE_URL
  const { setUser } = useUserStore()

  const GoogleAuth = async () => {
    try {
      await axios.get('GoogleURL/auth/google').then(res => {
        const resData = res.data
        setUser(resData)
      })
    } catch (err) {
      console.log(err)
    }
  }
  return { GoogleAuth }
}
