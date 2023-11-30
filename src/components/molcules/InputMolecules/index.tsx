import Input from '@/components/atoms/Input/index'

type InputTitleProps = {
  inputTitle: string
}

function InputMolcules({ inputTitle }: InputTitleProps) {
  const inputPosition = {
    positiontop: 4,
  }

  return (
    <div className="w-[440px] h-[80px] bg-white   ">
      <span className="text-base bg-blue-400 font-medium relative bottom-[2px]">
        {inputTitle}
      </span>
      <Input inputPosition={inputPosition} />
    </div>
  )
}

export default InputMolcules
