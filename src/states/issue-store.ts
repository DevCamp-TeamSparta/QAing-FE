import { create } from 'zustand'

interface IssueStore {
  issues: Issues[] | null
  setIssues: (folder: Issues[]) => void
}

type Images = {
  createdAt: string
  owner: string
  originImageUrl: string
  editedImageUrl: string | null
  parentIssueFile: string
  updatedAt: string
  issueName: string
  timestamp: number
  _id: string
}

type Issues = {
  images: Images[]
  issueName: string
  videoUrl: string
}

export const useIssueStore = create<IssueStore>(set => ({
  issues: [],
  setIssues: issues => set({ issues }),
}))
