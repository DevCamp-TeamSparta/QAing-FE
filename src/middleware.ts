import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest, res: NextResponse) {
  return NextResponse.next()
}
