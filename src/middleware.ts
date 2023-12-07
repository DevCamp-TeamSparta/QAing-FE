import { NextRequest, NextResponse } from 'next/server'
import Cookies from 'js-cookie'

export default function middleware(req: NextRequest, res: NextResponse) {
  return NextResponse.next()
}
