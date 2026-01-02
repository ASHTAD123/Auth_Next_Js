import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";

connect()

export async function POST(request:NextRequest) {
 
const router = useRouter();

  const requestBody = await request.json();
    
   const { token, password, confirmPassword } = requestBody;

   console.log("Token : ",token);
   console.log("Password :" ,password);
   console.log("Confirm Password : ", confirmPassword);

   
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password,salt);

   if(password===confirmPassword){
    
    console.log("Passwords matched");

       let user = await User.findOneAndUpdate(
      
        { forgotPasswordToken: token },

         {
           password: hashedPassword,
           forgotPasswordToken: undefined,
           forgotPasswordTokenExpiry: undefined,
         },
         { new: true }
       );
      
       console.log("USER" ,user);
       
       router.push("/login");

   }else{
      console.log("Password doesn't matched");
   }

  
    return NextResponse.json({success:"Success"})
}
 