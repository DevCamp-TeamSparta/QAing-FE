import Link from 'next/link'

export default function Test2Page() {
  return (
    <div>
      <h1>Test2Page</h1>
      <Link href={'/test/1'}>move to test1</Link>
    </div>
  )
}
