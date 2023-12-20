export type Folder = {
  folderName: string
  _id: string
  issues: string[]
  createdAt: string
}

export interface IssueStore {
  folder: Folder[] | null
  setFolder: (folder: Folder[]) => void
}
