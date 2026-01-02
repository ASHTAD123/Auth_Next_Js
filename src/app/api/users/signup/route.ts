import {connect} from '@/dbconfig/dbconfig';
import User from '@/models/userModel';
import { NextRequest,NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helpers/nodemailer';

connect()

export async function POST(request:NextRequest) {
  
    try {
        
        const requestBody = await request.json(); 
        const {username,email,password} = requestBody;
        
        //Check if user already exists
        const user = await User.findOne({email});

        if(user) return NextResponse.json({error:"User already exists"},{status:400})
        
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //Create a new User
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save();
        
        //Send verification Email
         await sendEmail({email, emailType:"VERIFY", userId:savedUser._id})
         
        return NextResponse.json({
            message:"User created Successfully",
            success:true,
            savedUser
        })

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}