'use client'
// import { cookies } from 'next/headers'
// import { getServerSideProps } from 'next/dist/build/templates/pages'
import Cookies from 'js-cookie'
import axios from 'axios'

function Page() {
  // const cookieStore = cookies()
  // console.log('cookieStore', cookieStore)
  const baseURL = process.env.NEXT_PUBLIC_GOOGLE_URL
  const accessToken = 'Token is here'
  const tokenhandler = () => {
    console.log('확인')
    Cookies.set('accessToken', accessToken)
  }

  const apiTest = async () => {
    const data = await axios.get(`${baseURL}/users/api/test`).then(res => {
      console.log('res', res)
    })
  }

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
