'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import ReactDOM from 'react-dom'
import { useModalStore } from '@/states/modalStore'

export default function ModalPortal() {
  const pathname = usePathname()
  const { modal, setModal, backGroundClose, setBackGroundClose } =
    useModalStore()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    if (!isMounted) return
    document.body.style.overflow = modal ? 'hidden' : 'auto'
    if (!modal) {
      setBackGroundClose(true)
    }
  }, [modal])

  useEffect(() => {
    if (!isMounted) return
    setModal(null)
  }, [pathname])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!modal || !isMounted) {
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
        onClick={() => {
          if (backGroundClose) {
            setModal(null)
          }
        }}
      />
      <div className={'z-10'}>{modal}</div>
    </div>
  )
}
