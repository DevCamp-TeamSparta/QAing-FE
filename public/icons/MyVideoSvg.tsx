export function MyVideoSvg({ color, size }: SvgProps) {
  return (
    <svg
      width={size || '24'}
      height={size || '24'}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 7.5V28.5C1.5 30.1569 2.84314 31.5 4.5 31.5H31.5C33.1569 31.5 34.5 30.1569 34.5 28.5V11.2125C34.5 9.55565 33.1569 8.2125 31.5 8.2125H17.6244C16.654 8.2125 15.7434 7.74304 15.1806 6.95247L14.3316 5.76003C13.7687 4.96946 12.8582 4.5 11.8877 4.5H4.5C2.84315 4.5 1.5 5.84315 1.5 7.5ZM23.25 20.799C24.25 20.2217 24.25 18.7783 23.25 18.201L16.5 14.3038C15.5 13.7265 14.25 14.4482 14.25 15.6029V23.3971C14.25 24.5518 15.5 25.2735 16.5 24.6962L23.25 20.799Z"
        fill={color || '#3B3C3C'}
      />
    </svg>
  )
}
