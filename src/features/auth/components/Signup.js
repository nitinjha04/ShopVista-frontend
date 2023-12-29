import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createUserAsync,
  selectError,
  selectLoggedInUserToken,
} from "../authSlice";
import loginBgSvg from "../../../images/login-bg-svg.svg";
import logo from "../../../images/white-transparent-logo.png";

import {
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function Signup() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(errors);

  const user = useSelector(selectLoggedInUserToken);

  return (
    <>
      {user && <Navigate to="/" replace={true} />}

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
                  createUserAsync({
                    email: data.email,
                    password: data.password,
                    addresses: [],
                    role: "user",
                    name: data.name,
                  })
                );
                console.log(data);
              })}
            >
              <div className="px-5 py-7">
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Name
                </label>
                <input
                  input
                  id="name"
                  {...register("name", {
                    required: "Name is Required",
                  })}
                  type="name"
                  className="border outline-none rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
                {errors.email && (
                  <p className="text-red-500 bottom-3 relative text-center">
                    {errors.email.message}
                  </p>
                )}
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  E-mail
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
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Password
                </label>
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is Required",
                  })}
                  type="password"
                  className="border outline-none rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />{" "}
                {errors.password && (
                  <p className="text-red-500 bottom-3 relative text-center">
                    {errors.password.message}
                  </p>
                )}
                {error && (
                  <p className="text-red-500 text-center">{error.message}</p>
                )}
                <button
                  type="submit"
                  className="transition flex justify-center flex-row duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center "
                >
                  <span className="flex justify-center mr-2">Create Account </span>
                  <ArrowRightOnRectangleIcon className="w-4 h-5" />
                </button>
              </div>
            </form>
            <div className="py-5">
              <div className=" gap-1 justify-center  flex">
                <Link
                  to="/login"
                  className="text-center  sm:text-right  whitespace-nowrap"
                >
                  <button className=" flex flex-row transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <UserIcon className=" w-4 h-5" />
                    <span className="inline-block ml-1">Login</span>
                  </button>
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="bg-cover flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
        style={{ backgroundImage: `url(${loginBgSvg})` }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                createUserAsync({
                  email: data.email,
                  password: data.password,
                  addresses: [],
                  role: "user",
                  name: data.name,
                })
              );
              console.log(data);
            })}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  {...register("name", {
                    required: "Name is Required",
                  })}
                  type="name"
                  className="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "It is Required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "email not valid",
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgot"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "It is Required",
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "confirm password is required",
                    validate: (value, formValues) =>
                      value === formValues.password || "password not matching",
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login your Account
            </Link>
          </p>
        </div>
      </div> */}
    </>
  );
}
