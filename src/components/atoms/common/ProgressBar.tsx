export default function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="w-full bg-gray-300 rounded-full h-[8px]">
      <div
        className="bg-primary-default h-[8px] rounded-full transition-[width]"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
