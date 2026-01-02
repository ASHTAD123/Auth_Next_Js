"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {

  const router = useRouter();

  const [user,setUser] = React.useState({
    email:"",
    password:"",
    username:""
  })

  const [buttonDisabled,setButtonDisabled] = React.useState(false);
  const [loading,setLoading] = React.useState(false);


  const onSignup = async()=> {

    try {
        setLoading(true);

        const response = await axios.post("/api/users/signup",user);

        console.log("Signup Success");
        console.log("Response ", response.data);
        
        router.push("/login")

    } catch (error) {
      console.log("Signup Failed" ,error);
      
    }finally{
      setLoading(false);
    }
  
  }

  useEffect(()=>{

      if(user.email.length>0 && user.password.length>0 && user.username.length>0){
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true);
      }
  },[user]);



  return (
    <div className="flex flex-col items-center justify-content min-h-screen py-2">
 
      <h1 className="mb-15 mt-15 font-bold text-4xl">{loading ? "Processing" : "Signup"}
    
      </h1>

      <hr />

      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

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
        id="signupBtn"
        className="bg-blue-200 p-3 rounded-2xl m-2"
        onClick={onSignup}
      >
        {buttonDisabled ? "No Signup" : "Get Started"}
      </button>

      <Link href="/login" className="mt-2">
        Visit Login
      </Link>
    </div>
  );
}
