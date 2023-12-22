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
import { useEffect } from 'react'
import instance from '@/services/instance'
import { useUserStore } from '@/states/user-store/userStore'
import { User } from '@/types/userStore.types'
import { ProfileImageSvg } from '../../../../public/icons/ProfileImageSvg'

const SideBarRoutes = [
  {
    path: PAGE_URL.HOME,
    icon: <MyVideoSvg />,
    text: ' QA폴더',
  },
]

export default function SideBar() {
  const pathname = usePathname()
  const setModal = useModalStore(state => state.setModal)
  const addVideo = useVideoStore(state => state.addVideo)
  const { user, setUser } = useUserStore()

  function onClickProfileHandler() {
    if (!user) {
      return
    }
    setModal(<ProfileModal />)
  }

  function onClickStartButtonHandler() {
    // addVideo({
    //   name: '2023-11-15 16:24',
    //   issueNum: 8,
    //   createdAt: new Date(),
    // })
    window.open(
      'https://chromewebstore.google.com/detail/qaing-qa-%ED%99%94%EB%A9%B4-%EC%BA%A1%EC%B3%90-%EB%B0%8F-%EB%85%B9%ED%99%94/meoehebomhebdjdbcbeehbjnljdblocn',
      '_blank',
    )
  }
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
    <aside
      className={
        'fixed h-full  w-[268px] flex flex-col px-[24px] py-[36px] bg-gray-50'
      }
    >
      <Image src={MainLogo} alt={'로고'} width={100} height={36} />
      {/* todo: install 감지 후 diabled에 넣기 */}
      <CTAButton
        className={
          ' flex items-center justify-center mt-[48px] gap-[8px]   disabled:bg-primary-default disabled:opacity-30'
        }
        size={'medium'}
        disabled={false}
        onClick={onClickStartButtonHandler}
      >
        <RecodeSvg color={'white'} /> QA 시작하기
      </CTAButton>
      <div className={'mt-[32px]'}>
        {SideBarRoutes.map(route => (
          <Link
            key={route.path}
            href={route.path}
            className={clsx(
              `flex items-center gap-[12px] px-[12px] py-[16px] rounded-[16px] w-full`,
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
      <div className={'mt-auto'}>
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
                src={user.userProfileImg}
                alt={'user profile image'}
                width={48}
                height={48}
                className={'rounded-[50%] object-cover w-[48px] h-[48px]'}
              />
            ) : (
              <ProfileImageSvg />
            )}
            <div>
              <p className={'b1 text-black'}>{user.userName}</p>
              <p className={'b4 text-gray-500'}>{user.userEmail}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
