import { User } from '@/types/userStore.types'
import { useRouter } from 'next/navigation'

function useAdvancedSignup() {
  const router = useRouter()
  const isAdvancedSignup = (data: User) => {
    if (
      data.userName === null ||
      data.userPhoneNumber === null ||
      data.userJob === null ||
      data.userCompany === null
    ) {
      router.push('/auth/onboarding')
    }
  }
  return { isAdvancedSignup }
}

export default useAdvancedSignup
