import { z } from 'zod'

export type advanceInformationSchemaType = z.infer<
  typeof advanceInformationSchema
> // 타입 추론 자동
const phoneRegex = new RegExp(/^\d{3}-\d{4}-\d{4}$/)

export const advanceInformationSchema = z.object({
  username: z
    .string()
    .nonempty('이름을 입력해주세요.')
    .min(1, '이름은 1글자 이상으로 입력해주세요')
    .max(20, '이름은 20글자 이하로 입력해주세요')
    .regex(/^[가-힣a-zA-Z]{2,}$/, '이름을 정확히 입력해주세요'),

  company: z.string().max(20, '20자 이내로 입력해주세요.'),
  teamsize: z.string().refine(value => {
    if (value === '팀 규모를 선택해 주세요') {
      return '팀 규모를 선택해 주세요'
    }
    return true
  }),
  job: z
    .string()
    .refine(value => value !== '직무를 선택해주세요', '직무를 선택해주세요'),
  phone: z
    .string()
    .nonempty('연락처를 입력해주세요')
    .min(13, '연락처를 확인해주세요'),
})
