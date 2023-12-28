import amplitude from 'amplitude-js'

export const initAmplitude = () => {
  if (typeof window !== 'undefined') {
    amplitude.getInstance().init('2e2e5a386856efdf3237cf254a9d14d9')
    console.log('QAing Amplitude Web Initialized:', amplitude.getInstance())
  }
}

export const getCurrentUserId = () => {
  return amplitude.getInstance().getUserId()
}

export const setAmplitudeUserId = (user_id: string) => {
  if (typeof window !== 'undefined') {
    amplitude.getInstance().setUserId(user_id)
  }
}

export const logPageView = (eventName: string) => {
  if (typeof window !== 'undefined') {
    amplitude.getInstance().logEvent(eventName, {
      url: window.location.pathname,
      title: document.title,
      user_id: getCurrentUserId(),
    })
  }
}

export const logEvent = (eventName: string, eventProperties: any) => {
  eventProperties.user_id = getCurrentUserId()
  amplitude.getInstance().logEvent(eventName, eventProperties)
}

// export const resetAmplitude = () => {
//   if (typeof window !== "undefined") {
//     amplitude.getInstance().reset();
//   }
// }
