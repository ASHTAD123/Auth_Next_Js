"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {

  const router = useRouter();
  
  const [data, setData] = useState<{
    _id:string;
    username:string;
    email:string;
  } | null >(null);

  // const [data, setData] = useState<User | null>(null);


  useEffect(() => {
  
    getUserDetails();
  
  }, []);

  const getUserDetails = async () => {
  
    try {
      const res = await axios.get("/api/users/myProfile");
  
      console.log("Full Response:", res);
      console.log("User Data:", res.data);

      setData(res.data.data); 
  
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const logout = async () => {
  
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout : ", error.message);
    }
  };

  return (
   
   <div className="flex flex-col items-center justify-center min-h-screen py-2">
     
      <h1 className="text-4xl mb-10">Profile</h1>

      <div>
        <label htmlFor="">ID : {data?._id}</label>
      </div>

      <div>
        <label htmlFor="">Username : {data?.username}</label>
      </div>

      <div>
        <label htmlFor="">Email : {data?.email}</label>
      </div>

      <button className="bg-red-400 p-3 rounded-2xl m-10" onClick={logout}>
        Logout
      </button>
    </div>
  );
}