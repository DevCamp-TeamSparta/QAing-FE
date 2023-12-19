import axios from 'axios'
import instance from '@/services/instance'
import { Folder } from '@/types/userFolder.types'

export const fetchFolder = async (): Promise<Folder[]> => {
  const response = await instance.get('/folders')
  console.log('폴더 가져오기 성공:', response)
  return response.data
}

export const editFolder = async (folderId: string, UpdateFolderDto: object) => {
  const response = await instance.put(`/folder/${folderId}`, UpdateFolderDto)
  console.log('폴더명 수정 성공:', response)
  return response.data
}

export const deleteFolder = async (folderId: string) => {
  const response = await instance.delete(`/folder/${folderId}`)
  console.log('폴더명 삭제:', response)
  return response.data
}
