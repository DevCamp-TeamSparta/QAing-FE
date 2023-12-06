'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import ReactDOM from 'react-dom'
import { useModalStore } from '@/states/modalStore'

export default function ModalPortal() {
  const pathname = usePathname()
  const { modal, setModal } = useModalStore()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const closeModal = () => {
    setModal(null)
  }

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : 'auto'
  }, [modal])

  useEffect(() => {
    closeModal()
  }, [pathname])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!modal) {
    return null
  }
  return (
    <div
      className={
        'w-screen h-screen fixed left-0 top-0 flex items-center justify-center z-[100] bg-[rgba(27,27,27,0.30)]'
      }
    >
      <div
        className={'absolute left-0 top-0 w-full h-full'}
        onClick={closeModal}
      />
      <div className={'z-10'}>{modal}</div>
    </div>
  )
}
