'use client'

import Image from 'next/image'
import MainLogo from '/public/images/logo.png'
import { MyVideoSvg } from '../../../../public/svg/MyVideoSvg'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { PAGE_URL } from '@/constants/url'
import { useModalStore } from '@/states/modalStore'
import ProfileModal from '@/components/organisms/layout/ProfileModal'
import CTAButton from '@/components/atoms/CallToActionAButtonAtoms'
import { useVideoStore } from '@/states/videoStore'
import { RecodeSvg } from '../../../../public/svg/RecodeSvg'
import { BlogSvg } from '../../../../public/svg/BlogSvg'

const SideBarRoutes = [
  {
    path: PAGE_URL.HOME,
    icon: <MyVideoSvg />,
    text: '내 QA폴더',
  },
]

export default function SideBar() {
  const pathname = usePathname()
  const setModal = useModalStore(state => state.setModal)
  const addVideo = useVideoStore(state => state.addVideo)

  function onClickProfileHandler() {
    setModal(<ProfileModal />)
  }

  function onClickStartButtonHandler() {
    addVideo({
      name: '2023-11-15 16:24',
      issueNum: 8,
      createdAt: new Date(),
    })
  }
  return (
    <aside className={'w-[268px] flex flex-col px-[24px] py-[36px] bg-gray-50'}>
      <Image src={MainLogo} alt={'로고'} width={100} height={36} />
      {/* todo: install 감지 후 diabled에 넣기 */}
      <CTAButton
        className={
          'flex items-center justify-center mt-[48px] gap-[8px] disabled:bg-primary-default disabled:opacity-30'
        }
        size={'medium'}
        onClick={onClickStartButtonHandler}
        disabled={true}
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
          href={'https://www.qaing.co/'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          <BlogSvg color={'#5F6060'} />
          <p className={'b4 text-gray-800'}>QAing 블로그</p>
        </Link>
        <div className="w-full h-[1px] bg-gray-300 my-[16px]" />
        <div
          className={'flex items-center gap-[12px] cursor-pointer'}
          onClick={onClickProfileHandler}
        >
          {/* todo: 프로필 데이터로 대체 */}
          <div
            className={'w-[48px] h-[48px] rounded-[50%] bg-primary-default'}
          />
          <div>
            <p className={'b1 text-black'}>홍길동</p>
            <p className={'b4 text-gray-500'}>qaing@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
