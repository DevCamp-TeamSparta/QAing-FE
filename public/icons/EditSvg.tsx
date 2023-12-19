export function EditSvg({ color = '#1B1B1B' }: SvgProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4729 5.06715C11.7812 4.75889 12.2768 4.75481 12.5799 5.05804L14.9424 7.42148C15.2455 7.7247 15.2413 8.22041 14.933 8.52867L5.98243 17.4786C5.87223 17.5888 5.73242 17.6644 5.58062 17.696L2.59728 18.3162C2.04862 18.4303 1.5698 17.9513 1.68398 17.4026L2.30485 14.4189C2.33644 14.2671 2.41211 14.1272 2.52231 14.0171L11.4729 5.06715Z"
        fill={color}
      />
      <path
        d="M14.6396 1.90039C14.9478 1.59213 15.4435 1.58806 15.7466 1.89129L18.109 4.25472C18.4122 4.55795 18.408 5.05365 18.0997 5.36191L16.9286 6.53291C16.6203 6.84117 16.1247 6.84525 15.8216 6.54202L13.4591 4.17859C13.156 3.87536 13.1602 3.37965 13.4685 3.07139L14.6396 1.90039Z"
        fill={color}
      />
    </svg>
  )
}