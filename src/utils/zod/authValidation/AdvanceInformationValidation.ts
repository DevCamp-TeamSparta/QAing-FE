import { z } from 'zod'

export type advanceInformationSchemaType = z.infer<
  typeof advanceInformationSchema
> // 타입 추론 자동
const phoneRegex = new RegExp(/^\d{3}-\d{4}-\d{4}$/)

export const advanceInformationSchema = z.object({
  username: z
    .string()
    .nonempty('이름을 입력해주세요.')
    .min(2, '이름은 2글자 이상으로 입력해주세요')
    .max(10, '이름은 10글자 이하로 입력해주세요')
    .regex(/^[가-힣a-zA-Z]{2,}$/, '이름을 정확히 입력해주세요'),

  company: z.string().max(20, '20자 이내로 입력해주세요.'),
  teamsize: z
    .string()
    .refine(value => value !== '전부', '팀사이즈를 선택해 주세요'),
  job: z.string().refine(value => value !== '전부', '를 선택해 주세요'),
  phone: z
    .string()
    .nonempty('전화번호를 입력해주세요.')
    .min(13, '전화번호를 정확히 입력해주세요.'),
})
