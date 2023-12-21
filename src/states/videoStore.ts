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

interface VideoUploadStore {
  progress: number
  totalProgress: number
  setProgress: (progress: number, totalProgress: number) => void
}

export const useVideoUploadStore = create<VideoUploadStore>(set => ({
  progress: 2,
  totalProgress: 6,
  setProgress: (progress, totalProgress) => set({ progress, totalProgress }),
}))
