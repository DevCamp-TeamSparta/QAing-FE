import axios from 'axios'
import { MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import useUserStore from '@/states/user-store/userStore'

export const GoogleSignup = () => {
  const router = useRouter()
  const GoogleURL = process.env.NEXT_PUBLIC_GOOGLE_URL
  const { setUser } = useUserStore()

  try {
    axios.get(`${GoogleURL}/auth/google`).then(res => {
      const resData = res.data
      setUser(resData)
    })
  } catch (err) {
    console.log(err)
  }
}
