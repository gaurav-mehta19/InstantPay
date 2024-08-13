import z, { string } from 'zod';
export const signupInput = z.object({
    name:z.string().min(3),
    email:z.string().email().toLowerCase(),
    password:z.string().min(8)
})

export const signinInput = z.object({
    email:z.string().email().toLowerCase(),
    password:z.string().min(8)
})

export const forgetPasswordInput = z.object({
    password:string().min(8)
})

export type SignupInputTypes = z.infer<typeof signupInput>;
export type SigninInputTypes = z.infer<typeof signinInput> ;
export type ForgetPasswordInput = z.infer<typeof forgetPasswordInput>;