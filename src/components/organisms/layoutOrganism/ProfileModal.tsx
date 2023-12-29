import { useModalStore } from '@/states/modalStore'
import CTAButton from '@/components/atoms/CallToActionAButtonAtom/CallToActionButtonAtom'
import { User } from '@/types/userStore.types'
import Image from 'next/image'
import { useUserStore } from '@/states/user-store/userStore'
import { ProfileImageSvg } from '../../../../public/icons/ProfileImageSvg'
import { EditSvg } from '../../../../public/icons/EditSvg'
import React, { useEffect, useState } from 'react'
import instance from '@/services/instance'
import {
  getPresignedURL,
  uploadImageToS3,
  uploadImageToBackend,
  logout,
  editUserName,
} from '@/services/auth/auth.api'

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
    const files = e.target.files
    // console.log('파일 객체 : ', files)
    if (!files) return
    const file = files[0]
    setImageFile(file)
    // setImageFile(file)
    const objectUrl = URL.createObjectURL(file)
    setUpdateUser({
      ...updateUser,
      userProfileImg: objectUrl,
    })
  }

  async function onClickSaveButtonHandler() {
    if (!user) return
    // console.log('imageFile', imageFile)

    if (user.userName === updateUser.userName || updateUser.userName === '') {
      if (imageFile === null) return
      imageFile &&
        getPresignedURL(imageFile).then(data => {
          // console.log('presigned data', data)
          uploadImageToS3(data.url, imageFile).then(data => {
            // console.log('s3 버킷에 저장 완료', data)
            uploadImageToBackend(imageFile).then(data => {
              // console.log('백백엔드에 저장 API test', data)
            })
          })
        })
      closeModal()
      return
    }

    //프로필이름 수정만 할 때
    if (!imageFile) {
      // console.log('프로필 이름만 수정 시작')
      if (user.userName === updateUser.userName || updateUser.userName === '')
        return
      // console.log(
      //   '프로필 이름만 수정 이름이 변경되지 않거나 빈스트링이 아닐 때',
      // )
      updateUser.userName &&
        editUserName(updateUser.userName).then(data => {
          // console.log('프로필이름 수정 API test', data)
        })
      closeModal()
      return
    }

    if (
      imageFile &&
      updateUser.userName !== '' &&
      user.userName !== updateUser.userName
    ) {
      imageFile &&
        getPresignedURL(imageFile).then(data => {
          // console.log('presigned data', data)
          uploadImageToS3(data.url, imageFile).then(data => {
            // console.log('s3 버킷에 저장 완료', data)
            uploadImageToBackend(imageFile).then(data => {
              // console.log('백백엔드에 저장 API test', data)
            })
          })
        })

      updateUser.userName &&
        editUserName(updateUser.userName).then(data => {
          // console.log('프로필이름 수정 API test', data)
        })
      closeModal()
    }

    closeModal()
  }

  const handleLogout = () => {
    // console.log('로그아웃을 시작합니다.')
    logout().then(data => {
      // console.log('로그아웃', data)
      // closeModal()
    })
  }

  useEffect(() => {
    // console.log('updateUser', updateUser)
    // console.log('user', user)
  }, [updateUser, user])

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
          'w-[208px] px-[40px] py-[14px] mt-[24px] text-center rounded-[8px] bg-gray-300  t1'
        }
        name={'userName'}
        value={updateUser.userName}
        onChange={onChangeInputHandler}
      />

      <div className={'mt-[28px] flex gap-[8px]'}>
        <button
          className={'bg-gray-200 rounded-[99px] b3 w-[100px] p-[12px]'}
          onClick={closeModal}
        >
          취소
        </button>

        <CTAButton size={'small'} onClick={onClickSaveButtonHandler}>
          저장
        </CTAButton>
      </div>
      <form>
        <button
          className={'mt-[40px] b4 text-gray-700 w-[100px] p-[12px]'}
          onSubmit={() => {
            handleLogout()
          }}
        >
          로그아웃
        </button>
      </form>
    </div>
  )
}
