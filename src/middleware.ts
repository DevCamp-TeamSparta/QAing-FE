import { NextResponse } from 'next/server'
import Cookies from 'js-cookie'

export default function middleware(res: NextResponse) {
  const userdata = res.headers.get('authorization')
  if (userdata) {
    Cookies.set('authorization', userdata, { expires: 1 })
  }

  return NextResponse.next()
}
