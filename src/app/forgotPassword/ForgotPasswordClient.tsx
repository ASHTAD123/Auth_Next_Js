"use client"
import { useSearchParams } from "next/navigation";
import  {useState}  from "react";
import axios from "axios";

export default function ForgotPasswordClient() {
    
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  console.log("Token received ", token);

  const onSubmit = async () => {
    const payload = {
      token: token,
      password: password,
      confirmPassword: confirmPassword,
    };
    const response = await axios.post("/api/users/forgotPassword", payload);
    console.log(response);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl mb-10">Reset Password</h1>

      <div className="">
        <input
          type="password"
          name="newpass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="border-2 m-5 rounded-2xl p-2"
        />

        <br />

        <input
          type="password"
          name="confirmpass"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="border-2 m-5 rounded-2xl p-2"
        />
        <br />
        <br />
      </div>

      <button onClick={onSubmit} className="mt-1 border-3 rounded-2xl p-2">
        Submit
      </button>
    </div>
  );
}
