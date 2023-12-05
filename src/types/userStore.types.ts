export type User = {
  userEmail: string | undefined
  //사전 정보입력에서 받은 값
  userPhoneNumber: number | undefined
  userName: string | undefined
  userJob: string | undefined
  userTeamSize: string | undefined
  userCompany: string | undefined
}

export type UserStore = {
  user: User | null | string
  accessToken: string | null
  refreshToken: string | null
  registerUser: User | null
  setRegisterUser: (user: User) => void
  setAccessToken: (token: string) => void
  setRefreshToken: (token: string) => void
  setUser: (user: User) => void
  logout: () => void
}
