import React from "react";
// import { Container } from "../index";
import Container from "./container/Container";
import { useNavigate } from "react-router-dom";

function LoginPrompt() {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#6A7280] to-[#848B98] text-white">
            <Container>
                <div className="flex flex-col items-center text-center p-10 max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/15 animate-fadeIn">
                    {/* Hero Image */}
                    <img
                        src="https://img.freepik.com/premium-photo/cyber-security-concept-login-user-identification-information-security-encryption-secure-internet-access-cybersecurity-secure-access-user-s-personal-information_184421-1220.jpg?w=2000"
                        alt="Login Required"
                        className="w-48 h-48 object-cover rounded-full shadow-lg border-4 border-white mb-6"
                    />

                    {/* Heading */}
                    <h1 className="text-5xl font-extrabold tracking-wide text-gray-200">
                        Welcome to Our Community
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg mt-4 font-medium text-gray-300">
                        To access and share amazing posts, please{" "}
                        <span className="font-semibold text-[#E4E7EB]">Login</span> or{" "}
                        <span className="font-semibold text-[#E4E7EB]">Sign Up</span> using the navigation bar above.
                    </p>

                    {/* Call-to-Action Buttons */}
                    <div className="mt-6 flex gap-6">
                        <button
                            onClick={() => navigate("/login")}
                            className="px-6 py-3 bg-[#E4E7EB] text-[#6A7280] font-semibold text-lg rounded-xl hover:bg-gray-300 transition duration-300 shadow-lg"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/signup")}
                            className="px-6 py-3 bg-transparent border border-white text-white font-semibold text-lg rounded-xl hover:bg-white hover:text-[#6A7280] transition duration-300 shadow-lg"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default LoginPrompt;
