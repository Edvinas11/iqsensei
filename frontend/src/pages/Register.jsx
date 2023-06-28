import React from "react";
import { logo } from "../assets";
import Button from "../components/Button";
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className={`w-full min-h-full flex items-start`}>
      <div className="relative w-[100%] h-full flex flex-col md:w-1/2">
        {/* First half */}
        <div className="w-[100%] h-screen bg-primary flex flex-col p-20 justify-between items-center">
          <a href="/" className="w-[140px] h-[60px] mr-auto">
            <img src={logo} alt="iqsensei" />
          </a>

          <div className="w-full flex flex-col max-w-[500px]">
            <div className="w-full flex flex-col mb-2">
              <h1 className="text-3xl font-semibold mb-2">Registration</h1>
              <p className="text-base mb-2">
                Create an account.
              </p>
            </div>

            <div className="w-full flex flex-col">
              <input
                className="w-full text-black border-gray-200 border-b py-4 my-2 bg-transparent outline-none focus:border-gray-400"
                type="email"
                placeholder="Email"
              />
              <input
                className="w-full text-black border-gray-200 border-b py-4 my-2 bg-transparent outline-none focus:border-gray-400"
                type="password"
                placeholder="Password"
              />
              <input
                className="w-full text-black border-gray-200 border-b py-4 my-2 bg-transparent outline-none focus:border-gray-400"
                type="password"
                placeholder="Repeat password"
              />
            </div>

            <div className="w-full flex flex-col my-4">
              <Button
                type="submit"
                color="white"
                bgColor="#8c52ff"
                text="Register"
                borderRadius="10px"
                styles={`p-4 my-2`}
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-normal text-black">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold underline underline-offset-2 cursor-pointer">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Second half */}
      <div className="bg-purple w-1/2 h-screen object-cover md:flex hidden">
        <div className="absolute top-[25%] right-[10%] left-[60%] flex flex-col">
          <h1 className="text-3xl font-bold text-white my-4">
            Join Us and Unlock a World of Possibilities.
          </h1>
          <p className="text-xl text-white font-normal">
            Start for free and get attractive offers from the community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
