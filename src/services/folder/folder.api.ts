import { AxiosResponse } from 'axios'
import instance from '@/services/instance'
import { Folder } from '@/types/userFolder.types'

export const fetchFolder = async (): Promise<AxiosResponse> => {
  const response = await instance.get<Folder[]>('/folders')
  // console.log('폴더 가져오기 성공:', response);
  return response
}

export const editFolder = async (folderId: string, UpdateFolderDto: object) => {
  const response = await instance.put(`/folders/${folderId}`, UpdateFolderDto)
  // console.log('폴더명 수정 성공:', response)
  return response.data
}

export const deleteFolder = async (folderId: string) => {
  const response = await instance.delete(`/folders/${folderId}`)
  // console.log('폴더명 삭제:', response)
  return response.data
}
