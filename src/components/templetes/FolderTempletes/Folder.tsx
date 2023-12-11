'use client'
import React, { useEffect, useState } from 'react'
import Logo from '@/components/atoms/LogoAtoms/index'
import Image from 'next/image'
import ProgileImageDefault from '/public/images/profileImage.svg'
import Back from 'public/icons/back.svg'
import Edit from 'public/icons/edit.svg'
import Table from '@/components/molcules/TableMolecules/index'
import IssueCard from '@/components/organisms/issueCardOrganism/index'
import axios from 'axios'
import { usePathname } from 'next/navigation'

function Folder() {
  const baseURL = process.env.NEXT_PUBLIC_GOOGLE_URL
  const [folder, setFolder] = useState()
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   if (folder) return
  // }, [folder])

  // 라우팅 경로 가져오기
  const pathname = usePathname()
  // const { params = [] } = router.query

  const sections = pathname.split('/')
  const folderId = sections[2]

  useEffect(() => {
    console.log('folderId', folderId)
  }, [])

  //로고 사이즈 프롭스
  const logoSize = {
    alt: 'Logo',
    width: 100,
    height: 36,
  }
  const IssueCardProps = {
    imageUrl: 'sss',
    videoUrl: 'videoUrl',
    updatedAt: 'ddd',
    issueName: 'fff',
    _id: 'xxx',
  }

  const apiTest = async () => {
    try {
      await axios
        .get(`${baseURL}/folders/${folderId}/issues`, {
          withCredentials: true,
        })
        .then(res => {
          console.log('res.data', res.data)
          setFolder(res.data)
          setLoading(false)
        })
    } catch (err) {
      console.log('err', err)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!folderId) return
    apiTest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId])

  if (loading) return <div>로딩중</div>

  return (
    <div>
      <header className="h-[108px]   flex flex-col justify-center bg-gray-500  ">
        {/* 헤더 */}
        <div className="ml-[35px] flex justify-between felx-row  ">
          <Logo logoSize={logoSize} />
          <div className="mr-[36px] w-[40px] h-[40px]">
            <Image src={ProgileImageDefault} alt="default" />
          </div>
        </div>
      </header>
      {/* 뒤로가기, 폴더이름, 수정버튼 */}
      <div>
        <div className=" bg-gray-200">
          <div className="flex flex-row items-center h-[68px]  ml-9">
            <div>
              <Image src={Back} alt="back" />
            </div>
            <div className="ml-4">
              <Table />
            </div>
            <div className="ml-[10px]">
              <Image src={Edit} alt="edit" />
            </div>
          </div>
          <div className="px-9 pt-9">
            <div className="bg-gray-400  grid grid-cols-3 grid-rows-auto gap-x-[24px] gap-y-[28px]">
              <IssueCard IssueCardProps={IssueCardProps} />
              <IssueCard IssueCardProps={IssueCardProps} />
              <IssueCard IssueCardProps={IssueCardProps} />
              <IssueCard IssueCardProps={IssueCardProps} />
            </div>
            <div className="h-[76px] bg-blue-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Folder
