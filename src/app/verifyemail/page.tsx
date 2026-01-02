"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect ,useState} from "react";

export default function verifyEmailPage(){

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [emailType, setEmailType] = useState("");
  const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      await axios.post("api/users/verifyemail", { token, emailType });
      setVerified(true);
      console.log("Token attached : ", token);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const search = window.location.search;

    // parts[0] is "?token"
    // parts[1] is "123&emailType"
    // parts[2] is "VERIFY"
    const parts = search.split("=");
 
    // parts[1] is currently "123&emailType"
    // We need to cut parts[1] again at the "&"

    const rawTokenWithExtraText = parts[1];

    if (rawTokenWithExtraText) {

      // Cut "123&emailType" at the "&" and take the first part (index 0)
      const cleanToken = rawTokenWithExtraText.split("&")[0];
      setToken(cleanToken);
    }

    // Piece 2 is already clean ("VERIFY")
    const typeEmail = parts[2] || "";
    setEmailType(typeEmail);
    
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  

  useEffect(() => {
   
  
    if (verified && emailType) {
      
      const timer = setTimeout(() => {
        
        if (emailType === "VERIFY") {
        
          router.push("/login");
        
        } else if (emailType === "RESET") {
        
          router.push(`/forgotPassword?token=${token}`);
        }
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer if component unmounts
    }
  }, [verified, emailType, router]); // Trigger when these values change
  return (
    <div>
      <h1 className="text-4xl flex justify-center items-center w-full h-screen bg-green-300">
        {emailType === "VERIFIED"
          ? "Email Verified redirecting you to login"
          : "Email Verified , redirecting you to reset your password .... in "}
      </h1>
    </div>
  );
}