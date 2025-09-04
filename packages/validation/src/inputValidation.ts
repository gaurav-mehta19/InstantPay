import z, { string } from 'zod';
export const signupInput = z.object({
    name: z.string().min(3),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    password: z.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must contain at least one letter and one number")
})

export const signinInput = z.object({
    phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    password: z.string().min(8)
})

export const forgetPasswordInput = z.object({
    password:string().min(8)
})

export type SignupInputTypes = z.infer<typeof signupInput>;
export type SigninInputTypes = z.infer<typeof signinInput> ;
export type ForgetPasswordInput = z.infer<typeof forgetPasswordInput>;