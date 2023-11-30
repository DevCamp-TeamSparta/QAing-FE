import React from 'react'
import Logo from '@/components/atoms/Logo/index'
import Input from '@/components/atoms/Input/index'
import Drondwon from '@/components/atoms/Dropdown'
import InputMolecules from '@/components/molcules/InputMolecules/index'
import DropdownMoleclue from '@/components/molcules/DropdownMolecule/index'

function GoogleSignup() {
  const logoSize = {
    alt: 'Logo',
    width: 124,
    height: 44,
  }
  const lnputTitle = {
    name: '이름*',
    phone: '연락처*',
    company: '회사명(선택)',
  }
  const dropdownTitle = {
    job: '직무*',
    teamSize: '팀 규모',
  }

  return (
    <div>
      <Logo logoSize={logoSize} />
      <div className="relative">
        <p>QAing에 오신 걸 환영해요!</p>
        <p>여러분의 데이터를 안전하게 수집하고 있어요!</p>
        <div></div>
        분자
        <br />
        <InputMolecules inputTitle={lnputTitle.name} />
        <br />
        <InputMolecules inputTitle={lnputTitle.phone} />
        <br />
        <DropdownMoleclue dropdownTitle={dropdownTitle.job} />
        <br />
        <DropdownMoleclue dropdownTitle={dropdownTitle.teamSize} />
        <br />
        <InputMolecules inputTitle={lnputTitle.company} />
      </div>
      <p>안녕하세요</p>
      <Logo logoSize={logoSize} />
    </div>
  )
}

export default GoogleSignup
