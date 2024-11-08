import React from 'react';
import lgo from "../utils/lgoo.svg"
import ailogo from "../utils/ai.png"
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F7] font-sans">
      {/* Header */}
      <header className="md:block  bg-black p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center  justify-center">
            <img src={lgo} alt="" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[662px] md:lg:mt-[96px] mt-[24px] mx-auto px-[16px] lg:md:py-8">
        <div className="flex flex-col items-center">
          {/* robot Image */}
          <div className=" mb-8">
            <img
              src={ailogo}
              alt="Joy mascot"
              className="w-[90px] h-[106px] object-contain"
            />
          </div>

          {/* Welcome Text */}
          <h1 className="md:lg:text-[32px] text-[20px] lg:md:w-[662px] w-[320px]  font-medium text-center mb-8">
            Firstly, <span className="font-bold">what's your name</span> and <span className="font-bold">email</span>, friend?
          </h1>



          {/* Form */}
          <form className="md:lg:px-[154px] md:lg:w-fit w-full space-y-4">

            <div className="w-full mx-auto">
              {/* Google Sign In Button */}
              <button
                className="w-full font-bold flex mx-auto items-center justify-center gap-x-[14px] md:lg:py-[17px] py-[16px] px-[85px] md:lg:px-[74px] mb-[] bg-[#ffffff] rounded-[8px] text-[14px] "
              >
                <FcGoogle className='text-xl ' />
                Continue with Google
              </button>

              <div className=" mx-auto justify-center lg:md:py-[24px] py-[16px] flex items-center">
                <span className="px-4 text-gray-500 text-sm">or</span>
              </div>
            </div>

            <div className='w-full'>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your first name here"
                className="w-full p-[16px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your email here"
                className="w-full  p-[16px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="text-[12px] text-black font mt-4 mb-[24px]">
              By continuing, you agree to our{' '}
              <a href="#" className="underline font-bold">Terms uses  & </a><a href="#" className="underline font-bold">Privacy Policy</a>
            </div>


            <Link
              to="/otpverification"
            >
              <button
                type="submit"
                className=" w-full bg-black lg:md:w-[353px] w-[320px] px-[14px]  text-white text-sm md:text-base lg:text-base lg:md:px-[102px] md:lg:py-[16px] py-[12px] rounded-[8px]  mt-[24px]"
              >
                Continue with email
              </button>
            </Link>


          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;