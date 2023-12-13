import { create } from 'zustand'
import { ReactNode } from 'react'

interface ModalStore {
  modal: ReactNode | null
  setModal: (modal: ReactNode | null) => void
}

export const useModalStore = create<ModalStore>(set => ({
  modal: null,
  setModal: modal => set({ modal }),
}))
