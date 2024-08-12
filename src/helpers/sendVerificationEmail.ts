import {resend} from '@/lib/resend';
import verificationEmail  from '../../emails/verificationEmail'
import { ApiResponse } from '@/types/ApiResponce';

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
    ) : Promise<ApiResponse>{
        try{
            console.log(email)
            console.log('Attempting to send mail');
            await resend.emails.send({
                from: 'Mujahid <onboarding@resend.dev>',
                to: email,
                subject: 'quickfeedback Verification code',
                react: verificationEmail({username,otp:verifyCode}),
              });
              console.log('send mail successfully');
            return {success:true,message:"email verification code send successfully"};
        }catch(errorMail){
            console.log('Error sending verification mail',errorMail);
            return {success:false,message:"Failed to send verification code"};
        }
}