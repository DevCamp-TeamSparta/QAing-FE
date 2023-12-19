export type Folder = {
  folderId: object
  issues: object[]
  createdAt: string
}

interface IssueStore {
  folder: Folder[] | null
  setFolder: (folder: Folder[]) => void
}
