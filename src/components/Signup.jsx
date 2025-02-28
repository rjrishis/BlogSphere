import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice";
import { Input, Button, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(storeLogin(currentUser));
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
        <h2 className="text-center text-3xl font-extrabold text-white">
          Create an Account
        </h2>
        <p className="mt-2 text-center text-gray-300">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-[#BFC5D2] hover:text-white transition duration-200"
          >
            Sign in
          </Link>
        </p>
        {error && <p className="text-red-500 mt-6 text-center font-medium">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-6">
          <div className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              className="bg-[#848B98] text-black placeholder-gray-700 border-[#6A7280] focus:ring-2 focus:ring-white"
              {...register("name", { required: true })}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
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
              type="password"
              placeholder="Enter your password"
              className="bg-[#848B98] text-black placeholder-gray-700 border-[#6A7280] focus:ring-2 focus:ring-white"
              {...register("password", { required: true, minLength: 8 })}
            />
            <Button className="w-full bg-[#BFC5D2] hover:bg-[#6A7280] transition-all text-[#6A7280] hover:text-white py-3 rounded-lg text-lg font-semibold shadow-md">
              Sign Up
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center text-gray-300">
          <p>
            Forgot Password?{" "}
            <Link to="/reset-password" className="text-[#BFC5D2] hover:text-white">
              Reset here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
