'use client'
import axios from 'axios'

export default function Test1Page() {
  async function onClick() {
    const data = await axios.get('http://localhost:8080/auth/check')

    console.log(data)
  }
  return (
    <div>
      <h1>Test1Page</h1>
      <button onClick={onClick}>api call</button>
    </div>
  )
}
