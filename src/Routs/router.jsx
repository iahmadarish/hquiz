import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import React from "react";
import Welcome from "../Pages/Welcome/Welcome";
import OtpInput from "../Components/OtpInput";
import Login from "../Pages/Login/Login";
import Applying from "../Components/Applying";
// import QuizPage from "../Components/QuizPage";
import QuizPage from "../Components/QuizPage";
import WelcomeSlider from "../Components/Welcomeslider";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: < WelcomeSlider />
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/otpverification",
            element: <OtpInput/>
        },
        {
            path: "/progress",
            element: <QuizPage/>
        }
        ,
        {
            path: "/applying",
            element: <Applying/>
        }
        ,
      ]
    },
  ]);

