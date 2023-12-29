import React from "react";
import { useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";
import {
  resetPasswordAsync,
  selectMailSentStatus,
  selectPasswordReset,
} from "../authSlice";

import {
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import logo from "../../../images/white-transparent-logo.png";
import loginBgSvg from "../../../images/login-bg-svg.svg";
import greenTickGif from "../../../images/greenTick.gif";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const mailSentStatus = useSelector(selectMailSentStatus);
  const passwordReset = useSelector(selectPasswordReset);
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(errors);
  return (
    <>
      {email && token ? (
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
                  dispatch(
                    resetPasswordAsync({
                      email,
                      token,
                      password: data.password,
                    })
                  );
                  console.log(data);
                })}
              >
                <div className="px-5 py-7">
                  <label className="font-semibold text-lg text-center text-gray-600 pb-1 block">
                    Enter Your New Password
                  </label>
                  <input
                    id="password"
                    {...register("password", {
                      required: "password is Required",
                    })}
                    type="password"
                    className="border outline-none rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  />
                  {errors.password && (
                    <p className="text-red-500 bottom-3 relative text-center">
                      {errors.password.message}
                    </p>
                  )}
                  <label className="font-semibold text-lg text-center text-gray-600 pb-1 block">
                    Confirm Your Password
                  </label>
                  <input
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: "confirm password is required",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "password not matching",
                    })}
                    type="password"
                    className="border outline-none rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 bottom-3 relative text-center">
                      {errors.confirmPassword.message}
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
                          Password Changing
                        </p>
                      </div>
                    </div>
                  ) : passwordReset === true ? (
                    <div className=" text-center flex justify-center flex-col  ">
                      <img
                        className="h-10 w-10 mx-auto animate-bounce "
                        src={greenTickGif}
                        alt="Email sent"
                      />
                      <Link
                        to="/login"
                        className="text-center  mx-auto  whitespace-nowrap"
                      >
                        <button
                          className="transition flex justify-center flex-row duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center "
                        >
                          <span className="flex ml-3 justify-center mr-2">
                            Login{" "}
                          </span>
                          <ArrowRightOnRectangleIcon className="w-4 h-5 mr-1" />
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <button
                        type="submit"
                        className="transition flex justify-center flex-row duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center "
                      >
                        <span className="flex justify-center mr-2">
                          Change Password{" "}
                        </span>
                        <ArrowRightOnRectangleIcon className="w-4 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>This url is expired</div>
      )}
    </>
  );
}
