import {connect} from '@/dbconfig/dbconfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';


connect();

export async function POST(request:NextRequest) {
    
    try {
          
        const reqBody = await request.json()

        const {token,emailType} = reqBody;
        
        let user;
        
        if(emailType==="VERIFY"){
            user = await User.findOne({
            verifyToken:token,
            verifyTokenExpiry: {$gt: Date.now()}}
             )
        }else if(emailType ==="RESET"){
           
             user = await User.findOne({
               forgotPasswordToken: token,
               forgotPasswordTokenExpiry: { $gt: Date.now() },
             });
        }
        if(!user)
            return NextResponse.json({error:"Invalid token"},{status:400})
        
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        
        console.log(user);

        await user.save();

        return NextResponse.json({message:"Email verified",success:true})
        
    } catch (error:any) {
          console.log("Error in Verify email function");
          console.log(error);
          
        return NextResponse.json({error:error.message})
    }
}