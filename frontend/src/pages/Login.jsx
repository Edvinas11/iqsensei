import React from 'react';
import { logo } from '../assets';
import Button from '../components/Button';

const Login = () => {
    return (
      <div className={`w-full min-h-full flex items-start`}>
        <div className='relative w-1/2 h-full flex flex-col'>
          {/* First half */}
          <div className='bg-purple w-[100%] h-screen object-cover'>
            <div className='absolute top-[25%] left-[10%] flex flex-col'>
              <h1 className='text-3xl font-bold text-white my-4'>Join Us and Unlock a World of Possibilities.</h1>
              <p className='text-xl text-white font-normal'>Start for free and get attractive offers from the community.</p>
            </div>
          </div>
        </div>
        {/* Second half */}
        <div className='w-1/2 h-screen bg-primary flex flex-col p-20 justify-between items-center'>
          <img src={logo} alt="iqsensei" className='w-[140px] h-[60px] mr-auto' />

          <div className='w-full flex flex-col max-w-[500px]'>
            <div className='w-full flex flex-col mb-2'>
              <h3 className='text-3xl font-semibold mb-2'>Login</h3>
              <p className='text-base mb-2'>Welcome Back! Please enter your credentials.</p>
            </div>  

            <div className='w-full flex flex-col'>
              <input className="w-full text-black border-gray-200 border-b py-4 my-2 bg-transparent outline-none focus:outline-none" type="email" placeholder='Email' />
              <input className="w-full text-black border-gray-200 border-b py-4 my-2 bg-transparent outline-none focus:outline-none" type="password" placeholder='Password' />
            </div>

            <div className='w-full flex justify-between'>
              <div className='w-full flex items-center'>
                <input type="checkbox" className='w-4 h-4 mr-2'/>
                <p className='text-sm'>Remember me for 30 days</p>
              </div>
              <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>Forgot password?</p>
            </div>

            <div className='w-full flex flex-col my-4'>
              <Button type="submit" color="white" bgColor="#8c52ff" text="Log In" borderRadius="10px" styles={`p-4 my-2`}/>
              <Button type="submit" color="#8c52ff" bgColor="white" text="Register" borderRadius="10px" styles={`p-4 my-2 border border-gray-200`}/>
            </div>

            <div className='w-full flex items-center justify-center relative py-2'>
              <div className='w-full h-[1px] bg-gray-200'></div>
              <p className='text-lg absolute text-black/80 bg-primary'>or</p>
            </div>
            <Button type="submit" color="black" bgColor="white" text="Sign In With Google" borderRadius="10px" styles={`p-4 my-2 border border-gray-200`}/>
          </div>

          <div className='w-full flex items-center justify-center'>
            <p className='text-sm font-normal text-black'>
              Don't have a account? <span className='font-semibold underline underline-offset-2 cursor-pointer'>Sign up for free</span>
            </p>
          </div>
        </div>
      </div>
    )
}
  
export default Login