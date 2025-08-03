import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-white shadow-inner text-[#1e2223]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Mercazo Logo" className="w-[40px] h-[40px]" />
            <span className="text-xl font-semibold text-[#222]">Mercazo</span>
          </div>
          <p className="text-sm hidden md:block">
            Mercazo is your all-in-one online shopping destination, offering
            top-quality products, unbeatable deals, and fast delivery—all backed
            by trusted service designed to make your life easier every day.
          </p>
          <p className="text-sm md:hidden">
            Fast. Easy. Reliable. Mercazo Shopping
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col items-start text-left space-y-3">
          <h3 className="text-lg font-medium border-b-2 border-[#20b2aa] pb-1 tracking-wide">
            Company
          </h3>
          <ul className="space-y-2">
            <li
              className="text-sm cursor-pointer hover:underline transition"
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </li>
            <li
              className="text-sm cursor-pointer hover:underline transition"
              onClick={() => navigate("/about")}
            >
              About Us
            </li>
            <li className="text-sm cursor-pointer hover:underline transition hidden md:block">
              Delivery
            </li>
            <li className="text-sm cursor-pointer hover:underline transition">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-start text-left space-y-3">
          <h3 className="text-lg font-medium border-b-2 border-[#20b2aa] pb-1 tracking-wide">
            Get In Touch
          </h3>
          <ul className="space-y-2">
            <li className="text-sm">+91-9876543210</li>
            <li className="text-sm">contact@mercazo.com</li>
            <li className="text-sm hidden md:block">+1-123-456-7890</li>
            <li className="text-sm hidden md:block">admin@mercazo.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-gray-300"></div>

      {/* Copyright */}
      <div className="text-center text-xs py-4 bg-white text-gray-600">
        © 2025 mercazo.com — All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
