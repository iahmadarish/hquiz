import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import lgoai from "../Pages/utils/ai.png"
import lgo from "../utils/lgoo.svg"

const OtpInput = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const navigate = useNavigate();

  useEffect(() => {
    const isOtpComplete = otp.every(value => value !== "");
    if (isOtpComplete) {
      setTimeout(() => {
        navigate("/applying");
      }, 500);
    }
  }, [otp, navigate]);

  const handleChange = (value: any, index: any) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 4) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:lg:text-[32px] items-center text-center">
        <img
          src={lgoai}
          alt="Robot"
          className="w-[130px] h-[153px] mb-4"
        />
        <div className="md:lg:w-full w-[343px] md:lg:text-[32px] text-[20px]">
          <h2 className=" font-semibold">Nice to meet you, Imam! 🤝</h2>
          <p className="text-black mt-2">
            Please <span className="font-bold">check your email</span> and <span className="font-bold"> enter the code </span> below.
          </p>

        </div>
      </div>

      <div className="flex space-x-3 mt-6">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            id={`otp-input-${index}`}
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:border-blue-500"
          />
        ))}
      </div>
    </div>
  );
};

export default OtpInput;