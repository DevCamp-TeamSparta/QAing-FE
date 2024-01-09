export function FolderRowSvg({ color, size }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 5V19C1 20.1046 1.89543 21 3 21H21C22.1046 21 23 20.1046 23 19V7.475C23 6.37043 22.1046 5.475 21 5.475H11.7496C11.1026 5.475 10.4956 5.16203 10.1204 4.63498L9.55438 3.84002C9.17914 3.31297 8.57212 3 7.92514 3H3C1.89543 3 1 3.89543 1 5ZM15.5 13.866C16.1667 13.4811 16.1667 12.5189 15.5 12.134L11 9.5359C10.3333 9.151 9.5 9.63212 9.5 10.4019V15.5981C9.5 16.3679 10.3333 16.849 11 16.4641L15.5 13.866Z"
        fill={color}
      />
    </svg>
  )
}
