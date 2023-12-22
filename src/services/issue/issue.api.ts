import axios from 'axios'
import instance from '@/services/instance'

export const editIssue = async (
  folderId: string,
  issueId: string,
  UpdateIssueFileDto: object,
) => {
  const response = await instance.put(
    `/folders/${folderId}/issues/${issueId}`,
    UpdateIssueFileDto,
  )
  // console.log('이슈명 수정 성공:', response)
  return response.data
}

export const deleteIssue = async (folderId: string, issueId: string) => {
  const response = await instance.delete(
    `/folders/${folderId}/issues/${issueId}`,
  )
  // console.log('이슈명 삭제:', response)
  return response.data
}
