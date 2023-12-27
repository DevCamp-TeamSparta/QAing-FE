import axios, { AxiosResponse } from 'axios'
import instance from '@/services/instance'
import { signupSchemaType } from '@/utils/zod/authValidation/authValidation'
import { User, EditUserType } from '@/types/userStore.types'

export const fetchUser = async (): Promise<User> => {
  const response = await instance.get('/users/info')
  return response.data
}

export const editUser = async (UpdateUser: EditUserType) => {
  const response = await instance.put('/users/preInfo', UpdateUser)
  return response.data
}

const API_URL = 'https://jsonplaceholder.typicode.com' //더미
const mockData = {
  company: '팀스파르타',
  email: 'rhsok923@naver.cm',
  job: '개발자',
  password: 'Fkaus1234!',
  passwordCheck: 'Fkaus1234!',
  phoneNumber: '010-2222-4444',
  teamSize: 'exceedTen',
  username: '라형선',
}

export const signupRequest = async (
  signupSchema: signupSchemaType,
  numberValue: string,
  url: string,
) => {
  const postData = {
    userEamil: signupSchema.email,
    userPhoneNumber: numberValue,
    userName: signupSchema.username,
    userPassword: signupSchema.password,
    userVerifyPassword: signupSchema.passwordCheck,
    userJob: signupSchema.job,
    userTeamSize: signupSchema.teamSize,
    userCompany: signupSchema.company,
  }
  const headers = {}

  const response = await axios.post(url, mockData)

  return response.data
}

export const loginRequest = async (signupSchema: signupSchemaType) => {
  const postData = {
    userEamil: signupSchema.email,
    userPassword: signupSchema.password,
  }
  const headers = {}

  const response = await axios.post(`${API_URL}/users`, postData)

  return response.data
}
