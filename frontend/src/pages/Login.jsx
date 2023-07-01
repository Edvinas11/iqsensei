import React, { useState } from "react";
import { logo } from "../assets";
import Button from "../components/Button";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { isValidEmail } from "../actions/valid";
import { login } from "../actions/auth";

const Login = ({ isAuthenticated, login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if(isValidEmail(email)){
      login(email, password);
    }
  };

  if (isAuthenticated) return <Navigate to="/dashboard" />;

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
              <h1 className="text-3xl font-semibold mb-2">Login</h1>
              <p className="text-base mb-2">
                Welcome Back! Please enter your credentials.
              </p>
            </div>

            <form onSubmit={e => onSubmit(e)}>
              <div className="w-full flex flex-col">
                <input
                  className="w-full text-black border-gray-200 border-b py-4 my-2 bg-transparent outline-none focus:border-gray-400"
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  onChange={(e) => onChange(e)}
                  name="email"
                  value={email == null ? "" : email}
                  required
                />
                <input
                  className="w-full text-black border-gray-200 border-b py-4 my-2 bg-transparent outline-none focus:border-gray-400"
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                  onChange={(e) => onChange(e)}
                  name="password"
                  value={password == null ? "": password}
                  required
                />
              </div>

              {/* <div className="w-full flex justify-between mt-2">
                <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
                  Forgot password?
                </p>
              </div> */}

              <div className="w-full flex flex-col my-4">
                <Button
                  type="submit"
                  color="white"
                  bgColor="#8c52ff"
                  text="Log In"
                  borderRadius="10px"
                  styles={`p-4 my-2`}
                />
              </div>
            </form>
          </div>

          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-normal text-black">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold underline underline-offset-2 cursor-pointer"
              >
                Sign up for free
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
