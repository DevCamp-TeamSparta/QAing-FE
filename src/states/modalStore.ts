import { create } from 'zustand'
import { ReactNode } from 'react'

interface ModalStore {
  modal: ReactNode | null
  setModal: (modal: ReactNode | null) => void
  backGroundClose: boolean
  setBackGroundClose: (backGroundClose: boolean) => void
}

export const useModalStore = create<ModalStore>(set => ({
  modal: null,
  setModal: modal => set({ modal }),
  backGroundClose: true,
  setBackGroundClose: backGroundClose => set({ backGroundClose }),
}))
