import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import IssueThumbnailAtom from '@/components/atoms/issueThumbnailAtom/issueThumbnailAtom'
import CopyButton from '@/components/atoms/CopyButtonAtom/CopyButtonAtom'
import MoreIcon from '../../../../../public/icons/More'
import { EditSvg } from '../../../../../public/icons/EditSvg'
import DeleteIssueModal from '../DeleteIssueModal'
import { TrashSvg } from '../../../../../public/icons/TrashSvg'
import { useModalStore } from '@/states/modalStore'
import { useClickOutSide } from '@/hooks/useClickOutSide'
import { TypeImageIcon } from '../../../../../public/icons/TypeImageIcon'
import { TypeVideoIcon } from '../../../../../public/icons/TypeVideoIcon'
import CopyLinkIcon from '../../../../../public/icons/CopyLinkIcon'
import useClipboard from '@/hooks/useClipboard'
import { editIssue } from '@/services/issue/issue.api'
import { initAmplitude, logPageView, logEvent } from '@/lib/amplitude'

interface IssueCardProps {
  IssueCardProps: {
    images: Images[]
    issueName: string
    videoURL: string
  }
  folderId: string
  folderName: string
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

type Values = {
  newIssueName: string
}

function Index({ IssueCardProps, folderId, folderName }: IssueCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isMoreButtonClicked, setIsMoreButtonClicked] = React.useState(false)
  const [isCopyButtonClicked, setIsCopyButtonClicked] = React.useState(false)
  const [isEditButtonClicked, setIsEditButtonClicked] = React.useState(false)
  // const issue = IssueCardProps.images
  // console.log('IssueCardProps', IssueCardProps.images[0].parentIssueFile)

  const { images } = IssueCardProps
  const setModal = useModalStore(state => state.setModal)
  const [values, setValues] = useState<Values>({
    newIssueName: IssueCardProps.issueName,
  })
  const hiddenRef = useRef(null)

  useClickOutSide(ref, onClickOutsideHandler, [isMoreButtonClicked])
  useClickOutSide(copyRef, onClickOutsideHandler, [isCopyButtonClicked])
  const { handleCopyClipBoard } = useClipboard()

  function onClickOutsideHandler() {
    if (isMoreButtonClicked) {
      setIsMoreButtonClicked(false)
    }
    if (isCopyButtonClicked) {
      setIsCopyButtonClicked(false)
    }
  }

  function onClickEditButtonHandler(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation()
    setIsEditButtonClicked(prev => !prev)
    setIsMoreButtonClicked(false)
  }

  function onClickDeleteButtonHandler() {
    setIsMoreButtonClicked(false)
    setModal(
      <DeleteIssueModal
        issueID={images[0].parentIssueFile}
        folderId={folderId}
      />,
    )
  }
  function onClickMoreButtonHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    setIsMoreButtonClicked(!isMoreButtonClicked)
  }
  function onClickCopyButtonHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    linkButtonClickEvent('공통', '썸네일')
    setIsCopyButtonClicked(!isCopyButtonClicked)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  useEffect(() => {
    // console.log('folderId', folderId)
  }, [])

  //이슈 이름 변경
  const handleEditFolderSubmit = (
    event: React.FormEvent,
    folderId: string,
    _id: string,
    values: Values,
  ) => {
    event.preventDefault()
    if (values.newIssueName === '') return
    setIsEditButtonClicked(false)
    editIssue(folderId, images[0].parentIssueFile, values)
      .then(() => {
        // console.log('이슈 이름 변경 완료')
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (isEditButtonClicked && inputRef.current) {
      inputRef.current.focus() // input에 포커스
      inputRef.current.select() // 텍스트 선택
    }
  }, [isEditButtonClicked])

  //amplitude
  const linkButtonClickEvent = (contentType: string, buttonWhere: string) => {
    logEvent('qaing_folderpage_link_button_click', {
      button_name: '파일 링크복사',
      content_type: contentType,
      button_where: buttonWhere,
    })
  }

  return (
    <div className="w-[440px] h-[417px] relative">
      <div className="flex flex-col">
        <div className=" relative">
          <IssueThumbnailAtom
            imageUrl={images[0].originImageUrl}
            imageId={images[0]._id}
            videoUrl={IssueCardProps.videoURL}
          />
          <button
            onClick={onClickCopyButtonHandler}
            className="absolute top-0 right-0 z-30 mx-4 my-4 bg-primary-default w-[44px] h-[44px] rounded-[99px] flex flex-row justify-center items-center shadow-copybutton"
          >
            <CopyLinkIcon color={'#FFFFFF'} />
            {/* <CopyButton /> */}
          </button>
          {isCopyButtonClicked && (
            <div ref={copyRef} className={`relative `}>
              <div className="absolute bottom-[76px] right-[16px] bg-white py-5 px-[15px] rounded-2xl shadow-[0_6px_22px_0_rgba(0,0,0,0.20)] ">
                <div className="flex flex-col gap-3">
                  <div
                    className="rounded-2xl px-4 py-[10px] bg-gray-200 cursor-pointer hover:bg-primary-light "
                    onClick={() => {
                      handleCopyClipBoard(images[0].originImageUrl),
                        linkButtonClickEvent('이미지', '썸네일')
                    }}
                  >
                    <div className="flex flex-row ">
                      <div className="py-1 mr-3">
                        <div className="bg-white rounded-[99px]  p-2 ">
                          <TypeImageIcon color={'#00CCCC'} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 mr-[30px]">
                        <p className="b2">이미지</p>
                        <p className="b4 text-gray-600">으로 공유하기</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-2xl px-4 py-[10px] bg-gray-200 cursor-pointer hover:bg-primary-light "
                    onClick={() => {
                      handleCopyClipBoard(IssueCardProps.videoURL),
                        linkButtonClickEvent('영상', '썸네일')
                    }}
                  >
                    <div className="flex flex-row ">
                      <div className="py-1 mr-3">
                        <div className="bg-white rounded-[99px] p-2">
                          <TypeVideoIcon color={'#00CCCC'} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 mr-[30px]">
                        <p className="b2">앞뒤 10초 영상</p>
                        <p className="b4 text-gray-600">으로 공유하기</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="t1 mt-4 flex flex-row justify-between">
          {isEditButtonClicked ? (
            <form
              className="flex gap-[10px]"
              onSubmit={event =>
                handleEditFolderSubmit(
                  event,
                  folderId,
                  images[0].parentIssueFile,
                  values,
                )
              }
            >
              <div className=" bg-gray-200">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={values.newIssueName}
                  onChange={handleChange}
                  name="newIssueName"
                  value={values.newIssueName}
                  onBlur={event =>
                    handleEditFolderSubmit(
                      event,
                      folderId,
                      images[0]._id,
                      values,
                    )
                  }
                  maxLength={40}
                  style={{ minWidth: '50px' }}
                  className="  overflow-hidden truncate inline-block w-[428px] bg-white  "
                />
              </div>
            </form>
          ) : (
            <div className="flex flex-row justify-between w-[440px]">
              <p className="w-[428px]">{values.newIssueName}</p>
              <button onClick={onClickMoreButtonHandler}>
                <MoreIcon />
              </button>
            </div>
          )}

          {isMoreButtonClicked && (
            <div
              ref={ref}
              className={
                'absolute w-[136px] px-[8px] py-[12px] bottom-[-90px] right-[12px] bg-white rounded-[12px] shadow-[0_6px_14px_0_rgba(0,0,0,0.20)] [&>button]:p-[12px] [&>button]:flex [&>button]:items-center [&>button]:gap-[12px] [&>button]:rounded-[8px] z-40'
              }
            >
              <button
                className={'w-full hover:bg-gray-200'}
                onClick={onClickEditButtonHandler}
              >
                <EditSvg color={'#5F6060'} />
                <p className={'b4'}>이슈명 편집</p>
              </button>

              <button
                className={'w-full hover:bg-gray-200 '}
                onClick={onClickDeleteButtonHandler}
              >
                <TrashSvg color={'#5F6060'} /> <p className={'b4'}>이슈 삭제</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Index
