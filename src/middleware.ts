import { NextResponse } from 'next/server'

export default function middleware(res: NextResponse) {
  console.log(res)
}
