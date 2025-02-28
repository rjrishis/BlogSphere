import React from "react";
import { Link } from "react-router-dom";
import { FaPenNib } from "react-icons/fa"; // Blog-related icon

function Logo({ width = "100px" }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div
        className="flex items-center justify-center rounded-full bg-[#BFC5D2] p-2 shadow-lg"
        style={{ width, height: width }}
      >
        <FaPenNib className="text-[#6A7280] text-3xl" />
      </div>
      <h1
        className="text-white text-2xl font-bold tracking-wide"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        BlogSphere
      </h1>
    </Link>
  );
}

export default Logo;
