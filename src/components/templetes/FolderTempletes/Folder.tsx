'use client'
import React, { use, useEffect, useState } from 'react'
import Logo from '@/components/atoms/LogoAtoms/index'
import Image from 'next/image'
import ProgileImageDefault from '/public/images/profileImage.svg'
import Back from 'public/icons/back.svg'
import Table from '@/components/molcules/TableMolecules/index'
import IssueCard from '@/components/organisms/IssuePageOrganisms/issueCardOrganism/index'
import axios from 'axios'
import { usePathname } from 'next/navigation'

function Folder() {
  const backServer = process.env.NEXT_PUBLIC_BACKEND_API_URL
  const [folder, setFolder] = useState<object[]>([])
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')

  // useEffect(() => {
  //   if (folder) return
  // }, [folder])

  // 라우팅 경로 가져오기
  const pathname = usePathname()
  // const { params = [] } = router.query

  const sections = pathname.split('/')
  const folderId = sections[2]

  // useEffect(() => {
  //   console.log('folderId', folderId)
  // }, [])

  //로고 사이즈 프롭스
  const logoSize = {
    alt: 'Logo',
    width: 100,
    height: 36,
  }
  const IssueCardProps = {
    imageUrl:
      'https://s3-qaing-test.s3.ap-northeast-2.amazonaws.com/image_1702302459868.jpg',
    videoUrl:
      'https://s3-qaing-test.s3.ap-northeast-2.amazonaws.com/video_1702302465430.mp4',
    updatedAt: '2023-12-11T13:47:45.556Z',
    issueName: '이슈 1',
    _id: 'xxx',
  }

  const apiTest = async () => {
    // try {
    //   const res = await axios.get(`${baseURL}/folders/${folderId}/issues`, {
    //     withCredentials: true,
    //   })
    //   console.log('res.data', res.data)
    //   setFolder(res.data)
    // } catch (err) {
    //   console.log('err', err)
    // }
    // setLoading(false)
    // SSE 연결 설정
    // const eventSource = new EventSource(
    //   `http://your-backend.com/videos/subscribe/${folderId}`,
    // )
    // eventSource.onmessage = event => {
    //   const data = JSON.parse(event.data)
    //   switch (data.type) {
    //     case 'progress':
    //       setProgress(data.progress)
    //       break
    //     case 'message':
    //       setMessage(data.message)
    //       break
    //   }
    // }
  }

  useEffect(() => {
    if (!folderId) return
    try {
    } catch {}
    const eventSource = new EventSource(
      `${backServer}/videos/subscribe/${folderId}`,
      { withCredentials: true },
    )
    eventSource.onmessage = event => {
      const data = JSON.parse(event.data)
      console.log('data', data)
      if (!data.status) {
        setProgress(data.progress)
      } else {
        setMessage(data.message)
        eventSource.close()
      }
      // switch (data.type) {
      //   case 'progress':
      //     setProgress(data.progress)
      //     break
      //   case 'message':
      //     setMessage(data.message)
      //     break
      // }
    }

    //에러확인
    // eventSource.onerror = error => {
    //   // 오류 처리
    //   console.error('EventSource failed:', error)
    //   eventSource.close()
    // }

    // return () => {
    //   eventSource.close()
    //   console.log('연결 해제')
    // }
  }, [folderId])

  useEffect(() => {
    console.log('progress', progress)
    console.log('backServer', backServer)
  }, [progress])

  useEffect(() => {
    console.log('message', message)
  }, [message])

  return (
    <div>
      <header className="h-[108px]   flex flex-col justify-center  ">
        {/* 헤더 */}
        <div className="ml-[35px] flex justify-between felx-row   ">
          <Logo logoSize={logoSize} />
          <div className="mr-[36px] w-[40px] h-[40px]">
            <Image src={ProgileImageDefault} alt="default" />
          </div>
        </div>
      </header>
      {/* 뒤로가기, 폴더이름, 수정버튼 */}
      <div>
        <div className=" ">
          <div className="flex flex-row items-center h-[68px]  ml-9">
            <div>
              <Image src={Back} alt="back" />
            </div>
            <div className="ml-4">
              <Table />
            </div>
            {/* <div className="ml-[10px]">
              <Image src={Edit} alt="edit" />
            </div> */}
          </div>
          <div className="px-9 pt-9 gray-50">
            <div className="">
              {folder.length > 0 ? (
                <div className=" grid grid-cols-3 grid-rows-auto gap-x-[24px] gap-y-[28px]">
                  {folder.map((item: any) => {
                    return <IssueCard key={item._id} IssueCardProps={item} />
                  })}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center bg-gray-200 w-full h-[640px] t1 ">
                  <p className="mb-3"> 파일을 저장하고 있어요! </p>
                  <p> 새로고침을 눌러보세요</p>
                </div>
              )}
            </div>
            <div className="h-[76px] "></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Folder
