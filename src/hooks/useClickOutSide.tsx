import { MutableRefObject, useEffect } from 'react'

export const useClickOutSide = <T extends HTMLElement>(
  ref: MutableRefObject<T>,
  clickHandler,
  deps = [],
) => {
  useEffect(() => {
    const handleClickOutside = event => {
      if (!ref.current || ref.current.contains(event.target)) {
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
