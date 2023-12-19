import { create } from 'zustand'

interface IssueStore {
  folder: Folder[] | null
  setFolder: (folder: Folder[]) => void
}

type Folder = {
  folderId: string
  issues: object[]
  createdAt: string
}

export const issueStore = create<IssueStore>(set => ({
  folder: [],
  setFolder: folder => set({ folder }),
}))
