export function ProfileImageSvg({ color = '#4DDADA', size }: SvgProps) {
  return (
    <svg
      width={size || '48'}
      height={size || '48'}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="24" fill="url(#paint0_linear_204_2672)" />
      <defs>
        <linearGradient
          id="paint0_linear_204_2672"
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={color || '#4DDADA'} />
          <stop offset="1" stop-color="white" />
        </linearGradient>
      </defs>
    </svg>
  )
}
