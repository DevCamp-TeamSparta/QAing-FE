import Cookies from 'js-cookie'
import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import type { UserStore } from '@/types/userStore.types'

// 현재 시간으로부터 10분 후의 시간을 계산
const expires = new Date(new Date().getTime() + 10 * 60 * 1000)

export const useUserStore = create<UserStore>(set => ({
  registerUser: null,
  user: null,
  profileImg: null,
  profileName: null,
  accessToken: Cookies.get('accessToken') || null,
  refreshToken: Cookies.get('refreshToken') || null,
  setRegisterUser: user => set({ registerUser: user }),
  setProfileImg: imgURL => set({ profileImg: imgURL }),
  setProfileName: name => set({ profileName: name }),
  setAccessToken: token => {
    Cookies.set('accessToken', token, {
      expires: expires,
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
