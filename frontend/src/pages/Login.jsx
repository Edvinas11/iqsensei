import React, { useState } from "react";
import { logo } from "../assets";
import Button from "../components/Button";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { isValidEmail } from "../actions/valid";
import { login } from "../actions/auth";
import styles from "../style";
import ErrorMessage from "../components/ErrorMessage";

const Login = ({ isAuthenticated, login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidEmail(email)) {
      setError("Please provide a valid email address");
      setLoading(false);
      return;
    }

    try {
      const success = await login(email, password);
      if (!success) {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Unable to login. Please try again later");
    }

    setLoading(false);
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
            <div className="w-full flex flex-col mb-6">
              <h1 className="font-poppins font-semibold text-[52px] text-black ss:leading-[100.8px] leading-[75px] w-full mb-2">
                Login
              </h1>
              <p className={`${styles.paragraph} text-base mb-2`}>
                Welcome Back! Please enter your credentials.
              </p>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="w-full flex flex-col mb-10">
                <input
                  className="w-full font-poppins text-black border-gray-200 border-b py-4 my-2 bg-transparent outline-none focus:border-gray-400"
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  onChange={(e) => onChange(e)}
                  name="email"
                  value={email == null ? "" : email}
                  required
                />
                <input
                  className="w-full font-poppins text-black border-gray-200 border-b py-4 my-2 bg-transparent outline-none focus:border-gray-400"
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                  onChange={(e) => onChange(e)}
                  name="password"
                  value={password == null ? "" : password}
                  required
                />
              </div>

              {/* Error message section */}
              {error ? <ErrorMessage text={error} /> : null}
              {/* End of error message section */}

              <div className="w-full flex flex-col">
                <Button
                  type="submit"
                  color="white"
                  bgColor="#8c52ff"
                  text={
                    loading ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-gray-100"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    ) : (
                      "Log In"
                    )
                  }
                  borderRadius="10px"
                  styles={`p-4 my-2`}
                  disabled={loading}
                />
              </div>
            </form>
          </div>

          <div className="w-full flex items-center justify-center">
            <p className="font-poppins first-line:text-sm font-normal text-black">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-poppins font-semibold underline underline-offset-2 cursor-pointer"
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
