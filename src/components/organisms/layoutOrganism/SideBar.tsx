'use client'

import Image from 'next/image'
import MainLogo from '/public/images/logo.png'
import { MyVideoSvg } from '../../../../public/icons/MyVideoSvg'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { PAGE_URL } from '@/constants/url'
import { useModalStore } from '@/states/modalStore'
import ProfileModal from '@/components/organisms/layoutOrganism/ProfileModal'
import CTAButton from '@/components/atoms/CallToActionAButtonAtom/CallToActionButtonAtom'
import { useVideoStore } from '@/states/videoStore'
import { RecodeSvg } from '../../../../public/icons/RecodeSvg'
import { BlogSvg } from '../../../../public/icons/BlogSvg'
import { ProfileImageSvg } from '../../../../public/icons/ProfileImageSvg'
import { GuideBook } from '../../../../public/icons/GuideBookSvg'
import { useEffect } from 'react'
import { useUserStore } from '@/states/user-store/userStore'
import { fetchUser } from '@/services/auth/auth.api'
import { logEvent } from '@/lib/amplitude'
import useAdvancedSignup from '@/hooks/useAdvancedSignup'
import { StarBox } from '../../../../public/icons/StarBox'

const SideBarRoutes = [
  {
    path: PAGE_URL.HOME,
    icon: <MyVideoSvg />,
    text: ' 내 워크스페이스',
  },
]

export default function SideBar() {
  const pathname = usePathname()
  const setModal = useModalStore(state => state.setModal)
  const addVideo = useVideoStore(state => state.addVideo)
  const { user, setUser, profileImg, profileName } = useUserStore()
  const { isAdvancedSignup } = useAdvancedSignup()

  function onClickProfileHandler() {
    if (!user) {
      return
    }
    setModal(<ProfileModal />)
  }
  //익스텐션에 메세지 보내기
  const extensionCall = {
    type: 'extensionCall',
    message: '안녕하세요, 익스텐션에 메시지를 보냅니다!',
  }

  function onClickStartButtonHandler() {
    logEvent('qaing_mainpage_start_button_click', {
      button_name: 'QA 시작하기',
      //button_where: buttonWhere
    })
    // window.open(
    //   'https://chromewebstore.google.com/detail/qaing-qa-%ED%99%94%EB%A9%B4-%EC%BA%A1%EC%B3%90-%EB%B0%8F-%EB%85%B9%ED%99%94/meoehebomhebdjdbcbeehbjnljdblocn',
    //   '_blank',
    // )
    // 익스텐션 호출하는 커스텀 이벤트
    // const event = new CustomEvent('extensionCall', { detail: extensionCall })
    // document.dispatchEvent(event)
  }

  useEffect(() => {
    fetchUser()
      .then(data => {
        // console.log('사이드바 유저정보', data)
        setUser({
          userEmail: data.userEmail,
          userName: data.userName,
          userProfileImg: data.userProfileImg,
          userPhoneNumber: data.userPhoneNumber,
          userJob: data.userJob,
          userTeamsize: data.userTeamsize,
          userCompany: data.userCompany,
        })
        isAdvancedSignup(data)
      })
      .catch(e => console.error(e))
  }, [])

  return (
    <aside
      className={
        'fixed h-full  w-[268px] flex flex-col px-[24px] py-[36px] bg-gray-50'
      }
    >
      <Image src={MainLogo} alt={'로고'} width={100} height={36} />
      {/* todo: install 감지 후 diabled에 넣기 */}

      <div className={'mt-[32px]'}>
        {SideBarRoutes.map(route => (
          <Link
            key={route.path}
            href={route.path}
            className={clsx(
              `flex items-center bg-gray-200 gap-[12px] px-[17px] py-[16px] rounded-[16px] w-full`,
              {
                'text-black bg-gray-200': pathname === route.path,
                'text-gray-500': pathname !== route.path,
              },
            )}
          >
            {route.icon}
            <p className={'b3'}>{route.text}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 ml-4 b1 text-gray-700 ">
        <p>팀 워크스페이스</p>
        <div className="mt-[10px] py-3 flex">
          <StarBox />
          <div className="ml-4"> 추후 업데이트 예정</div>
        </div>
      </div>
      <div className={'mt-auto'}>
        <Link
          href={'https://qaing.oopy.io/guide'}
          target={'_blank'}
          className="flex px-[16px] py-[12px] gap-[12px] items-center b4 text-gray-800"
        >
          <GuideBook />
          사용 방법
        </Link>
        <Link
          className={'flex px-[16px] py-[12px] gap-[12px] items-center'}
          href={'https://qaing.oopy.io/'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          <BlogSvg color={'#5F6060'} />
          <p className={'b4 text-gray-800'}>QAing 블로그</p>
        </Link>
        <div className="w-full h-[1px] bg-gray-300 my-[16px]" />

        {user && (
          <div
            className={'flex items-center gap-[12px] cursor-pointer'}
            onClick={onClickProfileHandler}
          >
            {user.userProfileImg ? (
              <Image
                src={profileImg || user.userProfileImg}
                alt={'user profile image'}
                width={48}
                height={48}
                className={'rounded-[50%] object-cover w-[48px] h-[48px]'}
              />
            ) : (
              <ProfileImageSvg />
            )}
            <div className="w-[140px] ">
              <p className={'b1 text-black truncate'}>
                {profileName || user.userName}
              </p>
              <p className={'b4 text-gray-500 truncate '}>{user.userEmail}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
