'use client'

import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Logo from '@/components/atoms/LogoAtoms/index'
import Image from 'next/image'
import ProgileImageDefault from '/public/images/profileImage.svg'
import Back from 'public/icons/back.svg'
import IssueCard from '@/components/organisms/IssuePageOrganisms/issueCardOrganism/index'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { EditSvg } from '../../../../public/icons/EditSvg'
import { editFolder } from '@/services/folder/folder.api'
import IssueEmptyOrganism from '@/components/organisms/IssuePageOrganisms/IssueEmptyOrganism'
type Values = {
  newFolderName: string
}

function Folder() {
  const backServer = process.env.NEXT_PUBLIC_BACKEND_API_URL
  const [folder, setFolder] = useState<object[]>([])
  const [folderName, setFolderName] = useState<string>('2023-11-15 16:24')
  const [message, setMessage] = useState('')
  const [isEditButtonClicked, setIsEditButtonClicked] = React.useState(false)
  const [values, setValues] = useState<Values>({ newFolderName: folderName })
  const router = useRouter()
  //폴더명 변경
  const inputRef = useRef<HTMLInputElement>(null)

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

  //폴더명변경

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }
  function onClickEditButtonHandler(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation()
    setIsEditButtonClicked(prev => !prev)
  }

  useEffect(() => {
    if (isEditButtonClicked && inputRef.current) {
      inputRef.current.focus() // input에 포커스
      inputRef.current.select() // 텍스트 선택
    }
  }, [isEditButtonClicked])

  const handleEditFolderSubmit = (folderId: string, values: object) => {
    editFolder(folderId, values)
      .then(res => {
        console.log('res', res)
        alert('폴더명이 변경되었습니다.')
      })
      .catch(err => {
        console.error('err', err)
      })
  }

  return (
    <div>
      <header className="h-[108px]  flex flex-col justify-center  ">
        {/* 헤더 */}
        <div className="ml-[35px] flex justify-between felx-row   ">
          <Link href={'/'}>
            <Logo logoSize={logoSize} />
          </Link>
          <div className="mr-[36px] w-[40px] h-[40px]">
            <Image src={ProgileImageDefault} alt="default" />
          </div>
        </div>
      </header>
      {/* 뒤로가기, 폴더이름, 수정버튼 */}
      <div>
        <div className=" ">
          <div className="flex flex-row items-center h-[68px]  ml-9  ">
            <Link href={'/'}>
              <Image src={Back} alt="back" />
            </Link>

            <div className="ml-4">{/* <Table /> */}</div>
            {isEditButtonClicked ? (
              <form onSubmit={() => handleEditFolderSubmit(folderId, values)}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={folderName}
                  onChange={handleChange}
                  name="newFolderName"
                  value={values.newFolderName}
                  onBlur={() => setIsEditButtonClicked(false)}
                  maxLength={40}
                  className="h3  overflow-hidden truncate  bg-white w-[428px]"
                />
              </form>
            ) : (
              <div className="flex flex-row">
                <p className="h3">{folderName}</p>
                <button
                  onClick={onClickEditButtonHandler}
                  className="ml-[10px]"
                >
                  <EditSvg color={'#C0C2C2'} />
                </button>
              </div>
            )}
          </div>
          <div className="px-9 pt-9 gray-50">
            <div className="">
              <div className=" grid grid-cols-3 grid-rows-auto gap-x-[24px] gap-y-[28px]"></div>
              {folder.length > 0 ? (
                <div className=" grid grid-cols-3 grid-rows-auto gap-x-[24px] gap-y-[28px]">
                  {folder.map((item: any) => {
                    return (
                      <IssueCard
                        key={item._id}
                        IssueCardProps={item}
                        folderId={folderId}
                        folderName={folderName}
                      />
                    )
                  })}
                </div>
              ) : (
                <IssueEmptyOrganism
                  folderId={folderId}
                  setMessage={setMessage}
                />
              )}
            </div>
            <div className="flex flex-row items-center h-[68px] ml-9">
              <div>
                <Image src={Back} alt="back" />
              </div>
            </div>
            <div className="px-9 py-9 gray-50">
              <IssueEmptyOrganism folderId={folderId} setMessage={setMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Folder
