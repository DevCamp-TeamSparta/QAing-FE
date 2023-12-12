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
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [folder, setFolder] = useState<object[]>([])
  const [loading, setLoading] = useState(true)

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
    try {
      await axios
        .get(`${baseURL}/folders/${folderId}/issues`, {
          withCredentials: true,
        })
        .then(res => {
          console.log('res.data', res.data)
          setLoading(false)
          setFolder(res.data)
        })
    } catch (err) {
      console.log('err', err)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!folderId) return
    console.log('folder', folder)
    apiTest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId])

  return (
    <div>
      <header className="h-[108px]   flex flex-col justify-center  ">
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
          <div className="px-9 pt-9">
            <div className=" grid grid-cols-3 grid-rows-auto gap-x-[24px] gap-y-[28px]">
              {folder.length !== 0 ? (
                folder.map((item: any) => {
                  return (
                    <>
                      <IssueCard IssueCardProps={item} />
                    </>
                  )
                })
              ) : (
                <div className="absolute flex flex-col justify-center items-center bg-gray-200 w-[1440px] h-[640px] t1 ">
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
