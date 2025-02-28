import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice";
import { Input, Button, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    try {
      setError("");
      const session = await authService.login(data);
      console.log(session)
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log(userData)
        if (userData) dispatch(storeLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#6A7280]">
      <div className="mx-auto w-full max-w-md bg-[#515864] text-white p-10 rounded-2xl shadow-lg border border-[#848B98]">
        {/* <div className="flex justify-center mb-4">
          <Logo width="80px" />
        </div> */}
        <h2 className="text-center text-3xl font-extrabold text-white">Welcome Back</h2>
        <p className="mt-2 text-center text-gray-300">
          New here?&nbsp;
          <Link
            to="/signup"
            className="font-semibold text-[#BFC5D2] hover:text-white transition duration-200"
          >
            Create an account
          </Link>
        </p>
        {error && <p className="text-red-500 mt-6 text-center font-medium">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-6">
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              className="bg-[#848B98] text-black placeholder-gray-700 border-[#6A7280] focus:ring-2 focus:ring-white"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Enter a valid email address",
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              className="bg-[#848B98] text-black placeholder-gray-700 border-[#6A7280] focus:ring-2 focus:ring-white"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Password cannot exceed 20 characters",
                },
              })}
            />
            <Button className="w-full bg-[#BFC5D2] hover:bg-[#6A7280] transition-all text-[#6A7280] hover:text-white py-3 rounded-lg text-lg font-semibold shadow-md">
              Sign In
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center text-gray-300">
          <p>
            Forgot Password?{" "}
            <Link
              to="/reset-password"
              className="text-[#BFC5D2] hover:text-white"
            >
              Reset here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
