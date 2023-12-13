import { MutableRefObject, RefObject, useEffect } from 'react'

export const useClickOutSide = <T extends HTMLElement>(
  ref: RefObject<T>,
  clickHandler: (event: MouseEvent) => void,
  deps: boolean[] = [],
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      clickHandler(event)
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref, ...deps])
}
