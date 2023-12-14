import Cookies from 'js-cookie'
import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import type { UserStore } from '@/types/userStore.types'

export const useUserStore = create<UserStore>(set => ({
  registerUser: null,
  user: null,
  accessToken: Cookies.get('accessToken') || null,
  refreshToken: Cookies.get('refreshToken') || null,
  setRegisterUser: user => set({ registerUser: user }),
  setAccessToken: token => {
    Cookies.set('accessToken', token, {
      expires: 3,
    })
    set({ accessToken: token })
  },
  setRefreshToken: token => {
    Cookies.set('refreshToken', token, {
      expires: 7,
    })
    set({ refreshToken: token })
  },
  setUser: user => set({ user }),
  logout: () => {
    // localStorage.removeItem("user")
    Cookies.set('user', '', { expires: 0 })
    Cookies.set('accessToken', '', { expires: 0 })
    Cookies.set('refreshToken', '', { expires: 0 })
    set({ user: null, accessToken: null })
  },
}))
