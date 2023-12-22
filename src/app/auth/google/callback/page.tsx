'use client'
// import { cookies } from 'next/headers'
// import { getServerSideProps } from 'next/dist/build/templates/pages'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function Page() {
  const [folderList, setFolderList] = useState()
  // const cookieStore = cookies()
  // console.log('cookieStore', cookieStore)
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL
  const accessToken = 'Token is here'
  const getCookie = Cookies.get('access-token')
  // console.log('getCookie', getCookie)
  const tokenhandler = () => {
    // console.log('확인')
    Cookies.set('access-token', accessToken)
  }
  const router = useRouter()

  // const apiTest = async () => {
  //   try {
  //     const UpdateUserDto = { userName: 'IamGroot' }
  //     const UpdateFolderDto = {
  //       folderName: '수정 완료',
  //     }
  //     const UpdateIssueFileDto = {
  //       newIssueName: '수정 완료',
  //     }
  //     const data = await axios
  //       .delete(`${baseURL}/folders//issues/`, {
  //         withCredentials: true,
  //       })
  //       .then(res => {
  //         console.log('res.data', res.data)
  //         setFolderList(res.data)
  //       })
  //   } catch (err) {
  //     console.log('err', err)
  //   }
  // }

  useEffect(() => {
    // window.location.href = 'https://qaing.co'
    router.push('/')
    // console.log('getCookie', getCookie)
  })

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
