export function TypeImageIcon({ color = '#1B1B1B' }: SvgProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 5.7C3 4.20883 4.20883 3 5.7 3H18.3C19.7912 3 21 4.20883 21 5.7V12.5329L19.2271 10.7865C18.1862 9.76108 16.5184 9.7498 15.4637 10.761L11.5113 14.5506C11.2129 14.8367 10.758 14.8827 10.4083 14.6622L8.10816 13.2115C7.22813 12.6564 6.10749 12.6564 5.22747 13.2115L3 14.6163V5.7ZM7.95 10.2C9.19264 10.2 10.2 9.19264 10.2 7.95C10.2 6.70736 9.19264 5.7 7.95 5.7C6.70736 5.7 5.7 6.70736 5.7 7.95C5.7 9.19264 6.70736 10.2 7.95 10.2Z"
        fill={color}
      />
      <path
        d="M17.9639 12.0688L21 15.0596V18.3C21 19.7912 19.7912 21 18.3 21H5.7C4.20883 21 3 19.7912 3 18.3V16.7444L6.1877 14.7339C6.48104 14.5489 6.85458 14.5489 7.14793 14.7339L9.44809 16.1847C10.4971 16.8462 11.8618 16.7081 12.757 15.8498L16.7095 12.0603C17.061 11.7232 17.617 11.727 17.9639 12.0688Z"
        fill={color}
      />
    </svg>
  )
}