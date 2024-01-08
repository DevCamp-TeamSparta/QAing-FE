import { create } from 'zustand'

interface IssueStore {
  folder: Folder[] | null
  setFolder: (folder: Folder[]) => void
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

type Folder = {
  images: Images[]
  issueName: string
  videoUrl: string
}

export const useIssueStore = create<IssueStore>(set => ({
  folder: [],
  setFolder: folder => set({ folder }),
}))
