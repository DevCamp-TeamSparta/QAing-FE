import axios from 'axios'
import { MouseEvent } from 'react'
import Router from 'next/router'

const GoogleSignup = (e: MouseEvent<HTMLButtonElement>) => {
  const router = Router
  e.preventDefault()
  const Rest_api_key = process.env.NEXT_PUBLIC_KAKAO_APP_KEY //REST API KEY
  const redirect_uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
}
