import {z} from "zod"

export const sighInSchema = z.object({
    email: z.string(),
    password: z.string(),
})