import {z} from 'zod'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/model/User'
import { usernameValidation } from '@/schemas/sighUpSchema'
import { ApiResponse } from '@/types/ApiResponce'

const usernameQuerySchema = z.object({
    username:usernameValidation
})

export async function GET(request:Request){
    await dbConnect();

    try{
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }

        const result = usernameQuerySchema.safeParse(queryParam)
        
        if(!result.success){
            const usernameError = result.error.format().username?._errors || [];

            return Response.json({
                success:false,
                message: usernameError?.length > 0 ? usernameError.join(',') : 'Invalid query parameter'
            },{status:400})
        }
        
        const {username} = result.data;
        const existingUserwithUserName = await UserModel.findOne({username , isVerified:true})

        if(existingUserwithUserName){
            return Response.json({
                success:false,
                message: "username already taken"
            },{status:405})
        }
       
        return Response.json({
            success:true,
            message: "username is unique"
        },{status:200})

    }catch(error){
        return Response.json({
            success:false,
            message:"Error checking Username"
        },{status:500})
    }
}