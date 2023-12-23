'use client'

import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Logo from '@/components/atoms/LogoAtom/LogoAtoms'
import Image from 'next/image'
import ProgileImageDefault from '/public/images/profileImage.svg'
import Back from 'public/icons/back.svg'
import IssueCard from '@/components/organisms/IssuePageOrganisms/issueCardOrganism/IssueCardOrganism'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { EditSvg } from '../../../../public/icons/EditSvg'
import { editFolder } from '@/services/folder/folder.api'
import IssueEmptyOrganism from '@/components/organisms/IssuePageOrganisms/IssueEmptyOrganism'
import instance from '@/services/instance'
import { User } from '@/types/userStore.types'
import { useUserStore } from '@/states/user-store/userStore'
import { ProfileImageSvg } from '../../../../public/icons/ProfileImageSvg'
import { MyVideoSvg } from '../../../../public/icons/MyVideoSvg'
type Values = {
  newFolderName: string
}

function IssuePageTemplete() {
  const backServer = process.env.NEXT_PUBLIC_BACKEND_API_URL
  const [folder, setFolder] = useState<object[]>([])
  const [folderName, setFolderName] = useState<string>('')
  const [message, setMessage] = useState('')
  const [isEditButtonClicked, setIsEditButtonClicked] = React.useState(false)
  const [values, setValues] = useState<Values>({ newFolderName: folderName })
  const router = useRouter()
  const { user, setUser } = useUserStore()

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
    imageUrl:
      'https://static.qaing.co/35254e30e1fbffd775c6d1974bbe9a500da22d699a0c14b5d65c4bd6b333494c.jpg',
    videoUrl:
      'https://static.qaing.co/40d3ac9e49bf97172435d1ae0a7ab9a8751e1f97d85d731d4d6bf72b4f98a770.mp4',
    updatedAt: '2023-12-21T15:38:58.391Z',
    issueName: '이슈 1',
    _id: '65845c123f1d1a6684bf16ba',
  }

  useEffect(() => {
    const getIssues = async () => {
      try {
        const res = await axios
          .get(`${backServer}/folders/${folderId}/issues`, {
            withCredentials: true,
          })
          .then(res => {
            setFolder(res.data.issuesWithContents)
            setFolderName(res.data.folderName)
            console.log('res', res)
          })
          .catch(err => {
            err.response.status === 401 && router.push('/auth/login')
            console.log('res', res)
          })
      } catch (err) {}
      // setLoading(false)
    }
    getIssues()
  }, [message])

  useEffect(() => {
    console.log('folderName', folderName)
  }, [folderName])

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

  const handleEditFolderSubmit = (
    event: React.FormEvent,
    folderId: string,
    values: object,
  ) => {
    event.preventDefault()
    setIsEditButtonClicked(false)
    editFolder(folderId, values)
      .then(res => {
        // console.log('res', res)
        alert('폴더명이 변경되었습니다.')
      })
      .catch(err => {
        // console.error('err', err)
      })
  }
  useEffect(() => {
    // console.log('folder', folder)
  }, [folder])

  //프로필 이미지
  async function fetchUser(): Promise<User> {
    const response = await instance.get('/users/info')
    // console.log('res', response)
    return response.data
  }

  useEffect(() => {
    fetchUser()
      .then(data => {
        // console.log('data', data)
        setUser({
          userEmail: data.userEmail,
          userName: data.userName,
          userProfileImg: data.userProfileImg,
          userPhoneNumber: data.userPhoneNumber,
          userJob: data.userJob,
          userTeamSize: data.userTeamSize,
          userCompany: data.userCompany,
        })
      })
      .catch(e => console.error(e))
  }, [])

  return (
    <div>
      <header className="h-[108px]  flex flex-col justify-center  ">
        {/* 헤더 */}
        <div className="ml-[35px] flex justify-between felx-row   ">
          <Link href={'/'}>
            <Logo logoSize={logoSize} />
          </Link>
          <div className="mr-[36px] w-[40px] h-[40px]">
            {user && user.userProfileImg ? (
              <Image
                src={user.userProfileImg}
                alt={'user profile image'}
                width={40}
                height={40}
                className={'rounded-[50%]  object-cover w-[40px] h-[40px]'}
              />
            ) : (
              <ProfileImageSvg size={40} />
            )}
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
            <div className="ml-4">
              <MyVideoSvg />
            </div>
            <div className="ml-4"></div>
            {isEditButtonClicked ? (
              <form
                onSubmit={event =>
                  handleEditFolderSubmit(event, folderId, values)
                }
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={values.newFolderName}
                  onChange={handleChange}
                  name="newFolderName"
                  value={values.newFolderName}
                  onBlur={event =>
                    handleEditFolderSubmit(event, folderId, values)
                  }
                  maxLength={40}
                  className="h3  overflow-hidden truncate  bg-white w-[428px]"
                />
              </form>
            ) : (
              <div className="flex flex-row">
                <p className="h3">{values.newFolderName}</p>
                <p className="h3">{folderName}</p>

                <button
                  onClick={onClickEditButtonHandler}
                  className="ml-[10px]"
                >
                  {folderName !== '' ? <EditSvg color={'#C0C2C2'} /> : ''}
                </button>
              </div>
            )}
          </div>
          <div className="px-9 pt-9 gray-50">
            <div className="">
              <div className=" grid grid-cols-3 grid-rows-auto gap-x-[24px] gap-y-[28px]">
                <div className=" grid grid-cols-3 grid-rows-auto gap-x-[24px] gap-y-[28px]"></div>
              </div>
              <IssueCard
                key={IssueCardProps._id}
                IssueCardProps={IssueCardProps}
                folderId={folderId}
                folderName={folderName}
              />

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
          </div>
        </div>
      </div>
    </div>
  )
}

export default IssuePageTemplete
