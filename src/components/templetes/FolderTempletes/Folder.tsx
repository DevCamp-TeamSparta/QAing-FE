import React from 'react'
import Logo from '@/components/atoms/LogoAtoms/index'
import Image from 'next/image'
import ProgileImageDefault from '/public/images/profileImage.svg'
import Back from 'public/icons/back.svg'
import Edit from 'public/icons/edit.svg'
import Table from '@/components/molcules/TableMolecules/index'
import IssueCard from '@/components/organisms/issueCardOrganism/index'

function Folder() {
  //로고 사이즈 프롭스
  const logoSize = {
    alt: 'Logo',
    width: 100,
    height: 36,
  }
  const IssueCardProps = {
    src: 'sss',
    title: 'ddd',
  }

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
              <IssueCard />
              <IssueCard />
              <IssueCard />
              <IssueCard />
              <IssueCard />
              <IssueCard />
              <IssueCard />
              <IssueCard />
              <IssueCard />
            </div>
            <div className="h-[76px] bg-blue-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Folder
