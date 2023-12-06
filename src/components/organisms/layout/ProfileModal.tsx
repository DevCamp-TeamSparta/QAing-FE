import { useModalStore } from '@/states/modalStore'
import CTAButton from '@/components/atoms/CallToActionAButton'

export default function ProfileModal() {
  const setModal = useModalStore(state => state.setModal)

  return (
    <div
      className={
        ' w-[400px] px-[20px] py-[32px] bg-white flex flex-col items-center rounded-[16px]'
      }
    >
      <div className={'w-[72px] h-[72px] bg-brand-default rounded-[50%]'} />
      <div
        className={'mt-[24px] rounded-[8px] bg-gray-300 px-[40px] py-[14px]'}
      >
        Profile Name
      </div>
      <div
        className={
          'mt-[28px] flex gap-[8px] [&>button]:w-[100px] [&>button]:p-[12px]'
        }
      >
        <button className={'bg-gray-200 rounded-[99px]'}>취소</button>
        <CTAButton size={'small'}>저장</CTAButton>
      </div>
      <div className={'mt-[40px]'}>로그 아웃</div>
    </div>
  )
}
