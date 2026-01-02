import { NextRequest ,NextResponse} from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig"
import { sendEmail } from "@/helpers/nodemailer";


connect();

export async function POST(request: NextRequest) {

  try {
  
    console.log("POST METHOD");
    
    const requestBody = await request.json();
    
    console.log("Body",requestBody);
    
     const { email } = requestBody;
    
     const user = await User.findOne({ email });

     if (!user) return NextResponse.json({ error: "ERROR USER NOT FOUND" }, { status: 400 });

     await sendEmail({ email, emailType: "RESET", userId: user._id });

         return NextResponse.json({
                message:"Success reset pass",
                success:true
            })
  } catch (error) {
    console.log(error);
    
  }
}