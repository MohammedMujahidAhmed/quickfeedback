import {resend} from '@/lib/resend';
import verificationEmail  from '../../emails/verificationEmail'
import { ApiResponse } from '@/types/ApiResponce';

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
    ) : Promise<ApiResponse>{
        try{
            await resend.emails.send({
                from: 'you@example.com',
                to: email,
                subject: 'quickfeedback Verification code',
                react: verificationEmail({username,otp:verifyCode}),
              });
            return {success:true,message:"email verification code send successfully"};
        }catch(errorMail){
            console.log('Error sending verification mail',errorMail);
            return {success:false,message:"Failed to send verification code"};
        }
}