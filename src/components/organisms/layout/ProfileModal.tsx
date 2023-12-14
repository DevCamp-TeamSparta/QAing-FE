import { useModalStore } from '@/states/modalStore'
import CTAButton from '@/components/atoms/CallToActionAButtonAtoms/index'
import { User } from '@/types/userStore.types'
import Image from 'next/image'
import { useUserStore } from '@/states/user-store/userStore'
import { ProfileImageSvg } from '../../../../public/svg/profileImageSvg'
import { EditSvg } from '../../../../public/svg/EditSvg'
import React, { useEffect, useState } from 'react'
import instance from '@/services/instance'

export default function ProfileModal() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const setModal = useModalStore(state => state.setModal)
  const { user, setUser } = useUserStore()
  const [updateUser, setUpdateUser] = useState({
    userName: user?.userName,
    userProfileImg: user?.userProfileImg,
  })
  function closeModal() {
    setModal(null)
  }

  useEffect(() => {
    if (!user) return
    setUpdateUser({
      userName: user.userName,
      userProfileImg: user.userProfileImg,
    })
  }, [user])

  function onChangeInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })
  }

  function onChangeFileHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImageFile(file)
    const objectUrl = URL.createObjectURL(file)
    setUpdateUser({
      ...updateUser,
      userProfileImg: objectUrl,
    })
  }

  async function onClickSaveButtonHandler() {
    if (!user) return
    const response = await instance.put('/users/profile', {
      ...user,
      userName: updateUser.userName,
    })
    if (response.status === 200) {
      alert('프로필이 수정되었습니다.')
      setUser({
        ...user,
      })
    }
    closeModal()
  }
  if (!user) return null
  return (
    <div
      className={
        ' w-[400px] px-[20px] py-[32px] bg-white flex flex-col items-center rounded-[16px]'
      }
    >
      <div
        className={
          'relative w-[72px] h-[72px] bg-brand-default rounded-[50%] [&>svg]:w-[72px] [&>svg]:h-[72px]'
        }
      >
        {updateUser.userProfileImg ? (
          <Image
            className={'rounded-[50%]'}
            src={updateUser.userProfileImg}
            alt={'프로필 이미지'}
            fill
            objectFit={'cover'}
          />
        ) : (
          <ProfileImageSvg />
        )}
        <label>
          <button
            className={`absolute w-[24px] h-[24px] p-[3px] bg-white right-0 bottom-0 
            flex items-center justify-center border-[1px] border-gray-500 rounded-full
            [&>svg]:w-[12px] [&>svg]:h-[12px]
            `}
          >
            <EditSvg />
          </button>
          {/* 이미지 파일을 선택하는 input tag 그러나 보이지는 않는다.*/}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={onChangeFileHandler}
          />
        </label>
      </div>
      <input
        className={
          'w-[208px] px-[40px] py-[14px] mt-[24px] rounded-[8px] bg-gray-300  t1'
        }
        name={'userName'}
        value={updateUser.userName}
        onChange={onChangeInputHandler}
      />

      <div
        className={
          'mt-[28px] flex gap-[8px] [&>button]:w-[100px] [&>button]:p-[12px]'
        }
      >
        <button
          className={'bg-gray-200 rounded-[99px] b3'}
          onClick={closeModal}
        >
          취소
        </button>
        <CTAButton size={'small'} onClick={onClickSaveButtonHandler}>
          저장
        </CTAButton>
      </div>
      <button className={'mt-[40px] b4 text-gray-700'} onClick={closeModal}>
        로그 아웃
      </button>
    </div>
  )
}
