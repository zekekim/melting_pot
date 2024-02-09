import { z } from "zod"

const special_char: RegExp = new RegExp('(?=.*[!@#$&*])');
const capital_letter: RegExp = new RegExp('(?=.*[A-Z])');
const one_digit: RegExp = new RegExp('(?=.*[0-9])');

export const signUpFormSchema = z.object({
    username: z.string().min(2).max(10),
    password: z.string().min(8).max(50)
        .regex(special_char, { message: 'must contain at least one special char' })
        .regex(capital_letter, { message: 'must contain at least one capital letter' })
        .regex(one_digit, { message: 'must contain at least one digit' })
})

