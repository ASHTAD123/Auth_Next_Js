"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Login() {
 
    const router = useRouter();

    const [user, setUser] = React.useState({
      email: "",
      password: "",
    });

  const [buttonDisabled,setButtonDisabled] = React.useState(false);
  const [loading,setLoading] = React.useState(false);

    useEffect(()=>{
  
        if(user.email.length > 0 && user.password.length > 0 ){
            setButtonDisabled(false);
        }else{
          setButtonDisabled(true);
        }
    },[user]);
  
 
    const onLogin = async () => {

    try {

       setLoading(true);
       const response = await axios.post("/api/users/login",user);
       console.log("Response : ",response);

       router.push("/profile")
       
      } catch (error) {
         console.log("Login failed :",error);
    }finally{
      setLoading(false);
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-content min-h-screen py-2">

      <h1 className="mb-15 mt-15 font-bold text-4xl">Login</h1>

      <hr />

      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        id="loginBtn"
        className="bg-blue-200 p-3 rounded-2xl m-2"
        onClick={onLogin}
      >
        Get Started
      </button>
      
      <Link href="/emailForgotPassword" className="mt-2 font-bold">
        Forgot Password
      </Link>

      <Link href="/signup" className="mt-2">
        Not registered ?
      </Link>

    </div>
  );
}
