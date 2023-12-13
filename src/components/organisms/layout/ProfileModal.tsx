import { useModalStore } from '@/states/modalStore'
import CTAButton from '@/components/atoms/CallToActionAButtonAtoms/index'

export default function ProfileModal() {
  const setModal = useModalStore(state => state.setModal)
  function temp() {
    setModal(null)
  }
  return (
    <div
      className={
        ' w-[400px] px-[20px] py-[32px] bg-white flex flex-col items-center rounded-[16px]'
      }
    >
      <div className={'w-[72px] h-[72px] bg-brand-default rounded-[50%]'} />
      <div
        className={'mt-[24px] rounded-[8px] bg-gray-300 px-[40px] py-[14px] t1'}
      >
        Profile Name
      </div>
      <div
        className={
          'mt-[28px] flex gap-[8px] [&>button]:w-[100px] [&>button]:p-[12px]'
        }
      >
        <button className={'bg-gray-200 rounded-[99px] b3'} onClick={temp}>
          취소
        </button>
        <CTAButton size={'small'} onClick={temp}>
          저장
        </CTAButton>
      </div>
      <button className={'mt-[40px] b4 text-gray-700'} onClick={temp}>
        로그 아웃
      </button>
    </div>
  )
}
