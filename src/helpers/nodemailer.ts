import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';

export const sendEmail = async({email,emailType,userId}:any)=>{

    try {
        console.log("Node mailer");

        //Create a JWT Token
        const hashedToken = jwt.sign({userId}, process.env.TOKEN_SECRET!,{expiresIn:"15m"});

        if(emailType ==="VERIFY"){
           
            await User.findByIdAndUpdate(userId, {
              verifyToken: hashedToken,
              verifyTokenExpiry: Date.now() + 3600000,
            });
            
        }else if(emailType === "RESET"){
            
              await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
              });
        }
  
        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: `${process.env.NODE_MAILER_USER}`,
            pass: `${process.env.NODE_MAILER_PASS}`
          },
        });

        const mailOptions = {
          from: "ash@gmail.com",
          to: email,
          subject:
          emailType === "VERIFY"? "Verify your email": "Reset your password",

          html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}&emailType=${emailType}">here</a>
            
            to ${
               emailType === "VERIFY" ? "Verify your email": "Reset your password"
             }
             or copy and paste the link below in your browser.
              <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}&emailType=${emailType}
             </p>`,
        };

       const mailResponse = await transporter.sendMail(mailOptions);

       return mailResponse;

    } catch (error:any) {
        console.log("error in nodemailer"); 
        throw new Error(error);
    }

}