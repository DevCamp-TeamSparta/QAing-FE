import axios from 'axios'

// const router = useRouter()
// const GoogleURL = process.env.NEXT_PUBLIC_API_BASE_URL
// const { setUser } = useUserStore()
export const GoogleSignup = (GoogleURL: string, setUser: any) => {
  try {
    axios.get(`${GoogleURL}/auth/google`).then(res => {
      const resData = res.data
      setUser(resData)
    })
  } catch (err) {
    // console.log(err)
  }
}
