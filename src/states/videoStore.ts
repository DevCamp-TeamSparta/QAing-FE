import { create } from 'zustand'

export interface Video {
  name: string
  issueNum: number
  createdAt: Date
}

interface UserVideoStore {
  videos: Video[]
  addVideo: (video: Video) => void
}
export const useVideoStore = create<UserVideoStore>(set => ({
  videos: [],
  addVideo: video => set(state => ({ videos: [...state.videos, video] })),
}))
