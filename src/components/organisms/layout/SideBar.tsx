'use client'

import Image from 'next/image'
import MainLogo from '/public/images/logo.png'
import { MyVideoSvg } from '../../../../public/svg/MyVideoSvg'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { SettingSvg } from '../../../../public/svg/SettingSvg'
import { PAGE_URL } from '@/constants/url'
import { useModalStore } from '@/states/modalStore'
import ProfileModal from '@/components/organisms/layout/ProfileModal'

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
  function onClickProfileHandler() {
    setModal(<ProfileModal />)
  }
  return (
    <aside className={'w-[268px] flex flex-col px-[24px] py-[36px]'}>
      <Image src={MainLogo} alt={'로고'} width={100} height={36} />
      <div className={'mt-[76px]'}>
        <div className={'flex items-center gap-[12px]'}>
          {/* todo: 프로필 데이터로 대체 */}
          <div className={'w-[48px] h-[48px] rounded-[50%] bg-brand-default'} />
          <div className={'t4'}>홍길동</div>
        </div>
        <div>
          <div className={'mt-[36px]'}>
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
                <div className={'b2'}>{route.text}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={'mt-auto px-[16px]'}>
        <button
          className={'flex py-[12px] gap-[12px]'}
          onClick={onClickProfileHandler}
        >
          <SettingSvg />
          계정 설정
        </button>
        <Link
          className={'flex py-[18px] gap-[12px] underline'}
          href={'https://www.qaing.co/'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          QAing 블로그
        </Link>
      </div>
    </aside>
  )
}
