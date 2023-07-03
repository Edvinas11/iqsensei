import React, { useState } from "react";
import { logo } from "../assets";
import Button from "../components/Button";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../actions/auth";
import { isValidEmail } from "../actions/valid";
import styles from "../style";

const Register = ({ isAuthenticated, register }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  const [accountCreated, setAccountCreated] = useState(false);

  const { username, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    // TODO: Check if email is valid. Regex pattern
    if (password === re_password && isValidEmail(email)) {
      try {
        register(username, password, email);
        setAccountCreated(true);
      } catch (error) {
        // TODO. Display a message
        console.error(error);
        setAccountCreated(false);
      }
      
    }
  };

  if (isAuthenticated) return <Navigate to="/dashboard" />
  if (accountCreated) return <Navigate to="/login" />

  return (
    <div className={`w-full min-h-full flex items-start`}>
      <div className="relative w-[100%] h-full flex flex-col md:w-1/2">
        {/* First half */}
        <div className="w-[100%] h-screen bg-primary flex flex-col p-20 justify-between items-center">
          <a href="/" className="w-[140px] h-[60px] mr-auto">
            <img src={logo} alt="iqsensei" />
          </a>

          <div className="w-full flex flex-col max-w-[500px]">
            <div className="w-full flex flex-col mb-5">
              <h1 className="font-poppins font-semibold text-[52px] text-black ss:leading-[100.8px] leading-[75px] w-full mb-2">User Registration</h1>
              <p className={`${styles.paragraph} text-base mb-2`}>Create an account.</p>
            </div>

            <form onSubmit={e => onSubmit(e)}>
              <div className="w-full flex flex-col mb-10">
                <input
                  className="w-full font-poppins text-black border-gray-200 border-b py-4 my-2 bg-transparent outline-none focus:border-gray-400"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => onChange(e)}
                  required
                  name="username"
                  value={username}
                  autoComplete="off"
                />
                <input
                  className="w-full font-poppins text-black border-gray-200 border-b py-4 my-2 bg-transparent outline-none focus:border-gray-400"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => onChange(e)}
                  required
                  value={email}
                  name="email"
                  autoComplete="off"
                />
                <input
                  className="w-full font-poppins text-black border-gray-200 border-b py-4 my-2 bg-transparent outline-none focus:border-gray-400"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => onChange(e)}
                  minLength="6"
                  required
                  name="password"
                  value={password}
                  autoComplete="off"
                />
                <input
                  className="w-full font-poppins text-black border-gray-200 border-b py-4 my-2 bg-transparent outline-none focus:border-gray-400"
                  type="password"
                  placeholder="Repeat password"
                  onChange={(e) => onChange(e)}
                  minLength="6"
                  required
                  name="re_password"
                  value={re_password}
                  autoComplete="off"
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
            </form>
          </div>

          <div className="w-full flex items-center justify-center">
            <p className="font-poppins first-line:text-sm font-normal text-black">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-poppins font-semibold underline underline-offset-2 cursor-pointer"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Second half */}
      <div className="bg-purple w-1/2 h-screen object-cover md:flex hidden">
        <div className="absolute top-[25%] right-[10%] left-[60%] flex flex-col">
          <h1 className="font-poppins font-semibold ss:text-[52px] text-[32px] ss:leading-[100.8px] leading-[75px] w-full text-white my-4">
            Join Us and Unlock a World of Possibilities.
          </h1>
          <p className={`${styles.paragraph} text-xl text-white font-normal`}>
            Start for free and get attractive offers from the community.
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
