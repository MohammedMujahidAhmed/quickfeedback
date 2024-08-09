import {z} from "zod"

export const messageSchema = z.object({
    content: z.string()
    .min(10,{message:"content must be atleast 10 charectors"})
    .max(300,{message:"content must not be longer than 300 charectore"})
})