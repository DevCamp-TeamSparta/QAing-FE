'use client'
import React, { useEffect, useState } from 'react'
import Logo from '@/components/atoms/LogoAtoms/index'
import Image from 'next/image'
import ProgileImageDefault from '/public/images/profileImage.svg'
import Back from 'public/icons/back.svg'
import IssueCard from '@/components/organisms/IssuePageOrganisms/issueCardOrganism/index'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import IssueEmptyOrganism from '@/components/organisms/IssuePageOrganisms/IssueEmptyOrganism'

function Folder() {
  const backServer = process.env.NEXT_PUBLIC_BACKEND_API_URL
  const [folder, setFolder] = useState<object[]>([])
  const [folderName, setFolderName] = useState<string>('')
  const [message, setMessage] = useState('')

  // 라우팅 경로 가져오기
  const pathname = usePathname()

  const sections = pathname.split('/')
  const folderId = sections[2]

  //로고 사이즈 프롭스
  const logoSize = {
    alt: 'Logo',
    width: 100,
    height: 36,
  }
  const IssueCardProps = {
    imageUrl: '',
    videoUrl: '',
    updatedAt: '2023-12-11T13:47:45.556Z',
    issueName: '이슈 1',
    _id: 'xxx',
  }

  useEffect(() => {
    const getIssues = async () => {
      try {
        const res = await axios.get(
          `${backServer}/folders/${folderId}/issues`,
          {
            withCredentials: true,
          },
        )
        setFolder(res.data.issuesWithContents)
        setFolderName(res.data.folderName)
      } catch (err) {}
      // setLoading(false)
    }
    getIssues()
  }, [message])

  //이슈명 수정

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
        <div className="flex flex-row items-center h-[68px] ml-9">
          <div>
            <Image src={Back} alt="back" />
          </div>
        </div>
        <div className="px-9 py-9 gray-50">
          {/*{folder.length > 0 ? (*/}
          {/*  <div className="grid grid-cols-3 grid-rows-auto gap-x-[24px] gap-y-[28px]">*/}
          {/*    {folder.map((item: any) => {*/}
          {/*      return (*/}
          {/*        <IssueCard*/}
          {/*          key={item._id}*/}
          {/*          IssueCardProps={item}*/}
          {/*          folderId={folderId}*/}
          {/*          folderName={folderName}*/}
          {/*        />*/}
          {/*      )*/}
          {/*    })}*/}
          {/*  </div>*/}
          {/*) : (*/}
          <IssueEmptyOrganism folderId={folderId} setMessage={setMessage} />
          {/*)}*/}
        </div>
      </div>
    </div>
  )
}

export default Folder
