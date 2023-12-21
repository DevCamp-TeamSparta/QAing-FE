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
import IssueEmptyOrganism from '@/components/organisms/IssuePageOrganisms/IssueEmptyOrganism'

function Folder() {
  const backServer = process.env.NEXT_PUBLIC_BACKEND_API_URL
  const [issues, setIssues] = useState<object[]>([])

  const [message, setMessage] = useState('')

  // 라우팅 경로 가져오기
  const pathname = usePathname()

  const sections = pathname.split('/')
  const issuesId = sections[2]

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

  useEffect(() => {
    const getIssues = async () => {
      try {
        const res = await axios.get(
          `${backServer}/issuess/${issuesId}/issues`,
          {
            withCredentials: true,
          },
        )
        setIssues(res.data)
      } catch (err) {}
      // setLoading(false)
    }
    getIssues()
  }, [message])

  return (
    <div>
      <header className="h-[108px]  flex flex-col justify-center  ">
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
        <div className="flex flex-row items-center h-[68px]  ml-9">
          <div>
            <Image src={Back} alt="back" />
          </div>
          <div className="ml-4">
            <Table />
          </div>
        </div>
        <div className="px-9 py-9 gray-50 ">
          {issues.length > 0 ? (
            <div className="grid grid-cols-3 grid-rows-auto gap-x-[24px] gap-y-[28px]">
              {issues.map((item: any) => {
                return <IssueCard key={item._id} IssueCardProps={item} />
              })}
            </div>
          ) : (
            <IssueEmptyOrganism issuesId={issuesId} setMessage={setMessage} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Folder
