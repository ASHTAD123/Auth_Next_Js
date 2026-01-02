"use client";
import axios from "axios";
import { useState } from "react";

export default function emailForgotPassword() {
 
  const [email, setEmail] = useState('');

  const onSubmit = async () => {
 
    try {
 
      const response = await axios.post("/api/users/emailForgotPassword", {email});

      console.log("Reset Password Email sent");
      console.log("Response : ", response.data);
 
    } catch (error) {
      console.log("Error resetting password", error);
    }

  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl mb-10">Confirm Email</h1>

      <div className="">
        <input
          type="email"
          name="emailid"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 m-5 rounded-2xl p-2"
        />
        <br />
      </div>

      <button className="mt-1 border-3 rounded-2xl p-2" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
}
