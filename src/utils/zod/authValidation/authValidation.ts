import { z } from 'zod'

export type signupSchemaType = z.infer<typeof signupSchema> // 타입 추론 자동
export type loginSchemaType = z.infer<typeof loginSchema>
const phoneRegex = new RegExp(/^\d{3}-\d{4}-\d{4}$/)

export const signupSchema = z
  .object({
    email: z
      .string()
      .nonempty('이메일을 입력해주세요.')
      .email('이메일 형식을 입력해주세요.'),
    username: z
      .string()
      .nonempty('이름을 입력해주세요.')
      .min(3, '이름은 3글자 이상으로 입력해주세요')
      .max(6, '이름은 6글자 이하로 입력해주세요')
      .regex(/^[가-힣]{2,}$/, '이름을 정확히 입력해주세요'),
    password: z
      .string()
      .nonempty('비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
        '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.',
      ),
    passwordCheck: z.string().nonempty('비밀번호를 다시 입력해주세요.'),
    // phoneNumber: z.string().regex(phoneRegex, '000-0000-0000로 입력해주세요'),
    job: z
      .string()
      .nonempty('직무를 입력해주세요.')
      .max(20, '20자 이내로 입력해주세요.'),
    teamSize: z
      .string()
      .nonempty('팀을 선택해 주세요.')
      .refine(value => {
        return ['lessthanfive', 'sixToTen', 'exceedTen'].includes(value)
      }, '올바른 팀원 수를 선택해 주세요.'),
    company: z
      .string()
      .nonempty('회사를 입력해주세요.')
      .max(20, '20자 이내로 입력해주세요.'),
  })
  .refine(data => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  })

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('이메일을 입력해주세요.')
    .email('이메일 형식을 입력해주세요.'),
  password: z
    .string()
    .nonempty('비밀번호를 입력해주세요.')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
      '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.',
    ),
})

// 사용하지않는 스키마에 optional체크를 하지않으면 onsubmit이 발생하지 않는다.
