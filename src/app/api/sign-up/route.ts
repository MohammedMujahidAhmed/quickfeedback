import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import bcrypt from "bcryptjs"

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail"


export async function POST(request: Request){
    await dbConnect();

    try{
        const {username, email, password} = await request.json();
        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified:true
        })

        if(existingVerifiedUser){
            return Response.json({
                success:false,
                message:"Username already taken"
            },{status:400})
        }

        const existingUserEmail = await UserModel.findOne(
            {email}
        )

        const verifyCode = Math.floor(100000 + Math.random()*900000).toString();

        if(existingUserEmail){
            if(existingUserEmail.isVerified){
                return Response.json({
                    success:false,
                    message:"User with the email already exist",
                },{status:400})
            }
            else{
                const hashedPassword = await bcrypt.hash(password,10);
                const expireDate = new Date();
                expireDate.setHours(expireDate.getHours()+1);
                existingUserEmail.password = hashedPassword;
                existingUserEmail.verifyCode = verifyCode;
                existingUserEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
            }
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10);
            const expireDate = new Date()
            expireDate.setHours(expireDate.getHours()+1);
            const newUser = new UserModel({
                username,
                email,
                password:hashedPassword,
                verifyCode:verifyCode,
                verifyCodeExpiry:expireDate,
                isVerified:false,
                isAcceptingMessage:true,
                messages: []
            }) 
            await newUser.save();
        }
        
        const emailResponse = await sendVerificationEmail(email,username,verifyCode);

        if(!emailResponse.success){
            return Response.json({
                success:false,
                message: emailResponse.message,
            },{status:500})
        }

        return Response.json({
            success:true,
            message: "User Registered Successfully Please verify the mail",
        },{status:201})

    }catch(error){
        console.log('Error Registering email',error)
        return Response.json(
            {
            success:false,
            message:"Error Registering User",

            },
            {
                status: 500
            }
        )
    }
}

