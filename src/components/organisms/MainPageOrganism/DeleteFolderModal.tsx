import { useModalStore } from '@/states/modalStore'
import { deleteFolder } from '@/services/folder/folder.api'
import { useEffect } from 'react'

type Props = {
  folderId: string
}

export default function DeleteFolderModal({ folderId }: Props) {
  const setModal = useModalStore(state => state.setModal)

  const onClickDeleteButtonHandler = (folderId: string) => {
    if (!folderId) return alert('폴더아이디가 없습니다.')
    deleteFolder(folderId)
      .then(() => {
        setModal(null)
      })
      .catch(e => {
        console.error('삭제 실패', e)
      })
  }

  useEffect(() => {
    // console.log('folderId', folderId)
  }, [folderId])
  return (
    <div
      className={
        'p-[24px] flex flex-col bg-white rounded-[16px] shadow-lg w-[392px] h-[200px]'
      }
    >
      <h3 className={'text-black b1'}>해당 영상 폴더를 삭제하시겠어요?</h3>
      <p className={'mt-[12px] text-gray-800 b4'}>
        삭제된 영상과 이슈들은 복구가 어려워요
      </p>
      <div className={'flex gap-[12px] ml-auto mt-auto '}>
        <button
          className={
            'bg-gray-200 text-black cursor-pointer b3 px-[28px] py-[12px] rounded-[99px]'
          }
          onClick={() => setModal(null)}
        >
          취소
        </button>
        <form>
          <button
            className={
              'bg-sementic-danger text-white cursor-pointer b3 px-[28px] py-[12px] rounded-[99px]'
            }
            onClick={() => onClickDeleteButtonHandler(folderId)}
          >
            삭제
          </button>
        </form>
      </div>
    </div>
  )
}
