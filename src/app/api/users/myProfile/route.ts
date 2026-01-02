import { tokenData } from "@/helpers/getTokenData";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";

connect();

export async function GET(request:NextRequest){

    try {
     
       const userid = await tokenData(request); 

       const user = await User.findOne({ _id: userid });

       console.log(user.username);
       
       return  NextResponse.json({
            message:"User found",  
            data:user
       });

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}