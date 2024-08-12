import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { verifySchema } from "@/schemas/verifySchema";


export async function POST(request:Request){
    await dbConnect();

    try{
        

        const {username,code} = await request.json();

        // const codeParam = {
        //     code: code
        // }

        // const result = verifySchema.safeParse(codeParam)
        
        // if(!result.success){
        //     const codeError = result.error.format().code?._errors || [];

        //     return Response.json({
        //         success:false,
        //         message: codeError?.length > 0 ? codeError.join(',') : 'Invalid query parameter'
        //     },{status:400})
        // }

        const decodedUsername = decodeURIComponent(username)
        const existingUserwithUserName = await UserModel.findOne({username:decodedUsername});
        if(!existingUserwithUserName){
            return Response.json({
                success:false,
                message:"User not found"
            },{status:500})
        }

        const isCodeValid = existingUserwithUserName.verifyCode === code
        const isCodeNotExpired = new Date(existingUserwithUserName.verifyCodeExpiry) > new Date();

        if(isCodeValid && isCodeNotExpired){
            existingUserwithUserName.isVerified = true;
            existingUserwithUserName.save();
            return Response.json({
                success:true,
                message:"Account Verify Successfully"
            },{status:200})
        }
        else if(!isCodeNotExpired){
            return Response.json({
                success:false,
                message:"verification code has expired, Please signUp again"
            },{status:400})
        }
        else{
            return Response.json({
                success:false,
                message:"Incorrect Verificaition code"
            },{status:400})
        }

    }
    catch(error){
        return Response.json({
            success:false,
            message:"Error verifying verify code"
        },{status:500})
    }
}