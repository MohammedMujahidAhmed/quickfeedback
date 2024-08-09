import {z} from "zod";

export const usernameValidation = z
                                .string()
                                .min(2,"Username must be atleast of 2 charectors") 
                                .min(40,"Username must not be longer than 40 charectors")
                                .regex(/^[a-zA-Z0-9_]+$/,"User name must not contain special charectors") 

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:'Invalid email address'}),
    password: z.string().min(6,{message:"password must be atleast of 2 charectors"})
})