export type User = {
  email: string | undefined
  password: string | undefined
  confirmPassword?: string | undefined
  username?: string | undefined
  confirmPasswordmatch?: string | undefined
  event: boolean
}

export type UserStore = {
  user: User | null | string
  accessToken: string | null
  refreshToken: string | null
  registerUser: User | null
  setRouterQuery: (query: string) => void
  setRegisterUser: (user: User) => void
  setAccessToken: (token: string) => void
  setRefreshToken: (token: string) => void
  setUser: (user: User) => void
  logout: () => void
}
