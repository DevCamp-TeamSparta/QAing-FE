import Cookies from 'js-cookie'

export const setCookieStorage = <T>(
  key: string,
  value: T,
  option: Cookies.CookieAttributes,
) => {
  if (typeof window === 'undefined') {
    return
  }
  const setCookie = Cookies.set(key, JSON.stringify(value), option)
  return setCookie
}
