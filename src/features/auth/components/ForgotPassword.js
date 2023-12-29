import React from "react";
import { useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  resetPasswordRequestAsync,
  selectMailSent,
  selectMailSentStatus,
} from "../authSlice";

import {
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import logo from "../../../images/white-transparent-logo.png";
import loginBgSvg from "../../../images/login-bg-svg.svg";
import emailSentGif from "../../../images/emailSent.gif";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const mailSent = useSelector(selectMailSent);
  const mailSentStatus = useSelector(selectMailSentStatus);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div
        className="bg-cover min-h-screen bg-gray-100 flex flex-col justify-center sm:py-2"
        style={{ backgroundImage: `url(${loginBgSvg})` }}
      >
        <div className="p-2 xs:p-0 mx-auto md:w-full md:max-w-md">
          <span className=" flex justify-center font-bold text-center text-xl mb-5">
            <img src={logo} className=" mb-3 text-center h-auto w-2/3" />
          </span>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(resetPasswordRequestAsync(data.email));
                console.log(data);
              })}
            >
              <div className="px-5 py-7">
                <label className="font-semibold text-lg text-center text-gray-600 pb-1 block">
                  Enter Your E-mail
                </label>
                <input
                  id="email"
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "email not valid",
                    },
                  })}
                  type="email"
                  className="border outline-none rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
                {errors.email && (
                  <p className="text-red-500 bottom-3 relative text-center">
                    {errors.email.message}
                  </p>
                )}
                {mailSentStatus === "loading" ? (
                  <div className=" flex justify-center mx-auto  flex-col ">
                    <div
                      class=" mx-auto mb-3 loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin
                    aspect-square w-8 flex justify-center items-center text-yellow-700"
                    ></div>
                    <div className="flex mx-auto justify-center items-center px-3 py-1 bg-[#181717] outline-[3px_#181717_solid] outline-offset-[-3px] rounded-[5px] border-[none] cursor-pointer [transition:400ms]">
                      <p className="text-[white] font-bold text-[1em] [transition:400ms]">
                        Mail Sending
                      </p>
                    </div>
                  </div>
                ) : mailSent === true ? (
                  <div className=" text-center flex justify-center flex-col  ">
                    <img
                      className="h-10 w-10 mx-auto animate-bounce "
                      src={emailSentGif}
                      alt="Email sent"
                    />
                    <h4 className=" bg-green-500 mx-auto px-3 py-1 rounded-sm ">
                      Email Sended
                    </h4>
                    <button type='submit' className=" text-blue-500 cursor-pointer">send again</button>
                  </div>
                ) : (
                  <div>
                    <button
                      type="submit"
                      className="transition flex justify-center flex-row duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center "
                    >
                      <span className="flex justify-center mr-2">
                        Forgot Password{" "}
                      </span>
                      <ArrowRightOnRectangleIcon className="w-4 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </form>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <Link
                  to="/signup"
                  className="text-center sm:text-right  whitespace-nowrap"
                >
                  <button className=" flex flex-row transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <UserPlusIcon className="w-4 h-5" />
                    <span className="inline-block ml-1">Create Account</span>
                  </button>
                </Link>
                <Link
                  to="/login"
                  className="text-center sm:text-left whitespace-nowrap"
                >
                  <button className=" flex flex-row transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <UserIcon className=" w-4 h-5" />
                    <span className=" ml-1">Login Account</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
