import React from 'react'

export default function useClipboard() {
  const decodeUrl = (url: string) => decodeURIComponent(url)
  const handleCopyClipBoard = async (url: string) => {
    try {
      const decodedUrl = decodeUrl(url)
      await navigator.clipboard.writeText(decodedUrl)
      alert('클립보드에 링크가 복사되었어요.')
    } catch (err) {
      console.error(err)
    }
  }

  return { handleCopyClipBoard }
}
