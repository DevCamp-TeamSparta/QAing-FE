import Cookies from 'js-cookie'
import { create } from 'zustand'
import type { StateCreator } from 'zustand'
// import { devtools } from 'zustand/middleware'
import type { UserStore } from './types/userStore.types'
// import { env } from '../../../env.mjs'
import { setCookieStorage } from '../../utils/storage'

const store: StateCreator<UserStore> = set => ({
  signupduplicateError: null,
  routerQuery: '/',
  registerUser: null,
  user: Cookies.get('user') || null,
  accessToken: Cookies.get('accessToken') || null,
  refreshToken: Cookies.get('refreshToken') || null,
  setSignupDuplicateError: error => set({ signupduplicateError: error }),
  setRouterQuery: query => {
    set({ routerQuery: query })
  },
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
  setUser: user => {
    // setLocalStorageValue("user", user)
    setCookieStorage('user', user, { expires: 1 })
    set({ user })
  },
  logout: () => {
    // localStorage.removeItem("user")
    Cookies.set('user', '', { expires: 0 })
    Cookies.set('accessToken', '', { expires: 0 })
    Cookies.set('refreshToken', '', { expires: 0 })
    set({ user: null, accessToken: null })
  },
})

const useUserStore = create<UserStore>()(store)

export default useUserStore
