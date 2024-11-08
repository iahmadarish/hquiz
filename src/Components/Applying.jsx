import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import lgoai from "../Pages/utils/ai.png";
import lgo from "../Pages/utils/lgoo.svg";
import LoadingAnimation from './LoadingAnimation';

const Applying = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Handle navigation to progress route with loading
  const handleProgress = () => {
    setIsLoading(true);
    // Simulate loading time before navigation
    setTimeout(() => {
      navigate('/progress');
    }, 2000); // 2 seconds delay
  };

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && !isLoading) {
        handleProgress();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingAnimation />}
      </AnimatePresence>
      <div className="w-full  flex py-4 items-center mx-auto justify-center bg-black p-2">
          <img
            src={lgo}
            alt="Evoked Logo"
            className="h-6 text-center object-contain"
          />
        </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-h-screen max-w-[962px] mx-auto bg-white"
      >
        

        <div className="md:lg:hidden w-[90px] h-[105px] mx-auto flex justify-center mt-4">
          <img src={lgoai} alt="" />
        </div>

        <div className="max-w-[962px] mx-auto px-4 md:lg:mt-[114px] py-8">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl md:lg:px-0 px-[16px] mx-auto lg:md:w-fit font-medium mb-[48px] text-center"
          >
            <span className="font-bold ">"Applying scents</span> is a proven way to improve our moods, express better and feel confident daily"
          </motion.h1>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex lg:md:flex-row md:lg:items-center md:lg:gap-4 mb-[24px]"
          >
            <div className="md:lg:w-20 md:lg:h-20 w-10 h-10 flex-shrink-0">
              <img
                src={lgoai}
                alt="Mascot"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="  bg-[#FFFFFF] border-2 py-[16px] px-[24px] rounded-b-[16px] rounded-r-[16px] text-[20px] text-gray-800">
              Answer 7 questions and I'll help you pick the best scents for you. Evoked's scents are all designer quality, minus the high price. Ready to level up your scent game?
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-end items-center space-x-4 mb-8"
          >
            <p className="text-xs md:lg:block hidden text-gray-500 flex items-center gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                <path d="M15.3333 0C14.9666 0 14.6666 0.300016 14.6666 0.666701V6.00031C14.6666 7.10037 13.7666 8.00041 12.6665 8.00041H1.71926L5.1461 4.4669C5.39945 4.20022 5.39278 3.7802 5.13277 3.52685C4.86609 3.2735 4.44607 3.2735 4.19272 3.54018L0.585866 7.25371C-0.194174 8.03375 -0.194174 9.30048 0.579199 10.0739L4.18605 13.8007C4.31939 13.9341 4.49274 14.0007 4.66608 14.0007C4.83942 14.0007 4.99943 13.9407 5.13277 13.814C5.39945 13.5607 5.40612 13.134 5.1461 12.874L1.71926 9.34048H12.6665C14.5066 9.34048 16 7.84707 16 6.00698V0.666701C16 0.300016 15.7 0 15.3333 0Z" fill="black" fillOpacity="0.7" />
              </svg>
              Or Press Enter
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleProgress}
              disabled={isLoading}
              className="bg-black text-white lg:md:px-6 px-[16px] py-[8px] lg:md:py-2 rounded-[8px] hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Continue
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="md:lg:block hidden text-center lg:md:mt-[200px] text-xs text-gray-500"
          >
            By continuing, you agree to our{' '}
            <a href="#" className="underline">Terms</a>,{' '}
            <a href="#" className="underline">Usage</a> &{' '}
            <a href="#" className="underline">Privacy Policy</a>.
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Applying;