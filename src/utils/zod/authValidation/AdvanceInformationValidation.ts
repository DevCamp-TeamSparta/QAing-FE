import { z } from 'zod'

export type advanceInformationSchemaType = z.infer<
  typeof advanceInformationSchema
> // 타입 추론 자동
const phoneRegex = new RegExp(/^\d{3}-\d{4}-\d{4}$/)

export const advanceInformationSchema = z.object({
  username: z
    .string()
    .nonempty('이름을 입력해주세요.')
    .min(3, '이름은 3글자 이상으로 입력해주세요')
    .max(6, '이름은 6글자 이하로 입력해주세요')
    .regex(/^[가-힣]{2,}$/, '이름을 정확히 입력해주세요'),
  // teamSize: z
  //   .string()
  //   .nonempty('팀을 선택해 주세요.')
  //   .refine(value => {
  //     return ['lessthanfive', 'sixToTen', 'exceedTen'].includes(value)
  //   }, '올바른 팀원 수를 선택해 주세요.'),
  company: z
    .string()
    .nonempty('회사를 입력해주세요.')
    .max(20, '20자 이내로 입력해주세요.'),
})
