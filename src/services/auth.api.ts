import axios from 'axios'
import { signupSchemaType } from '@/utils/zod/authValidation/authValidation'

const API_URL = 'https://jsonplaceholder.typicode.com' //더미

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

  const response = await axios.post(`${API_URL}/users`, postData)

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
