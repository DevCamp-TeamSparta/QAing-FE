import { NextResponse } from 'next/server'
import Cookies from 'js-cookie'

export default function middleware(res: NextResponse) {
  console.log('res', res)
  const userdata = res.headers.get('authorization')
  if (userdata) {
    Cookies.set('authorization', userdata, { expires: 1 })
  }

  return NextResponse.next()
}
