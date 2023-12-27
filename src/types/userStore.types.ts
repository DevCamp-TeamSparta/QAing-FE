export type User = {
  userEmail: string
  //사전 정보입력에서 받은 값
  userName: string
  userProfileImg: string
  userPhoneNumber: number | undefined
  userJob: string | undefined
  userTeamsize: string | undefined
  userCompany: string | undefined
}

export type EditUserType = {
  userName: string | undefined
  userPhoneNumber: number | undefined | null
  userJob: string | undefined | null
  userTeamsize: string | undefined | null
  userCompany: string | undefined | null
}

export type UserStore = {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  registerUser: User | null
  setRegisterUser: (user: User) => void
  setAccessToken: (token: string) => void
  setRefreshToken: (token: string) => void
  setUser: (user: User) => void
  logout: () => void
}
