import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserAsync,
  fetchLoggedInUserOrderAsync,
  selectOrders,
  selectUserInfo,
} from "../userSlice";
import { discountedPrice } from "../../../app/constants";

export default function UserOrders() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  console.log(userInfo)
  const orders = useSelector(selectOrders);

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return " text-purple-600";
      case "dispatched":
        return " text-yellow-600";
      case "delivered":
        return " text-green-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-purple-600";
    }
  };

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync());
  }, [dispatch]);

  if (!Array.isArray(orders)) {
    // Handle the case when 'orders' is not an array (e.g., it's not initialized yet or is null)
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className=" py-2 text-2xl  leading-7 text-gray-900    sm:truncate sm:text-3xl sm:tracking-tight">
        My Orders
      </h1>
      {orders.map((order) => (
        <>
          {/* <div className="mx-auto bg-white mt-2 pb-7 max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className=" py-6 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Your Orders #{order.id}
            </h1>
            <h3 className=" py-6 text-xl  leading-7 text-red-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Order Status: {order.status}
            </h3>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.href}>{item.product.title}</a>
                            </h3>
                            <p className="ml-4">
                              ${" "}
                              {item.product.discountedPrice}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            Qty : {item.quantity}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex  justify-between my-2 text-base font-medium text-gray-900">
                <p>Total Items In Your Cart</p>
                <p>{order.items.length} Items</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$ {order.totalAmount}</p>
              </div>
            </div>
            <p className="mt-0.5 text-sm pb-2 ">Shipping Address :</p>
            <div className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-400 px-4">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {order.selectedAddress.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress.email}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {order.selectedAddress.street},{order.selectedAddress.city},
                  {order.selectedAddress.state},{order.selectedAddress.pinCode}
                </p>
                <p className="text-sm leading-6 text-gray-900">
                  Number : {order.selectedAddress.phone}
                </p>
              </div>
            </div>
          </div> */}
          <>
            {/* component */}
            <div className="py-6 border-2 shadow-lg rounded-lg    mb-8 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
              {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
              <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl dark:text-black  lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                  Order #{order.id}
                </h1>
                {/* <p className="text-base dark:text-black font-medium leading-6 text-gray-600">
                  21st Mart 2021 at 10:34 PM
                </p> */}
                <p className=" dark:text-black  text-xl font-medium leading-6 text-gray-600">
                  Order Status :
                  <span
                    className={`${chooseColor(
                      order.status
                    )} text-xl  font-medium leading-6 text-gray-600`}
                  >
                    {" "}
                    {order.status}
                  </span>
                </p>
              </div>
              <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                  <div className="flex flex-col overflow-y-auto max-h-80 justify-start items-start dark:bg-userOrderColor bg-gray-50 px-2 py-2 md:py-6 md:p-6 xl:p-4 w-full">
                    {order.items.map((item) => (
                      <>
                        <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                          <div className="pb-4 md:pb-8 w-full md:w-40">
                            <img
                              className="w-full hidden md:block"
                              src={item.product.thumbnail}
                              alt={item.product.title}
                            />
                          </div>
                          <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                              <h3 className="text-xl dark:text-black  xl:text-2xl font-semibold leading-6 text-gray-800">
                                {item.product.title}
                              </h3>
                              <div className="flex justify-start items-start flex-col space-y-2">
                                <p className="text-sm dark:text-black  leading-none text-gray-800">
                                  <span className="dark:text-gray-400 text-gray-300">
                                    Category:{" "}
                                  </span>{" "}
                                  {item.product.category}
                                </p>
                                <p className="text-sm dark:text-black  leading-none text-gray-800">
                                  <span className="dark:text-gray-400 text-gray-300">
                                    Brand:{" "}
                                  </span>{" "}
                                  {item.product.brand}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between space-x-8 items-start w-full">
                              <p className="text-base dark:text-black  xl:text-lg leading-6">
                                ${item.product.discountedPrice}.00{" "}
                                <span className="text-red-300 line-through">
                                  {" "}
                                  ${item.product.price}.00
                                </span>
                              </p>
                              <p className="text-base dark:text-black  xl:text-lg leading-6 text-gray-800">
                                {item.quantity}
                              </p>
                              <p className="text-base dark:text-black  xl:text-lg font-semibold leading-6 text-gray-800">
                                ${item.quantity * item.product.discountedPrice}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-userOrderColor space-y-6">
                      <h3 className="text-xl dark:text-black  font-semibold leading-5 text-gray-800">
                        Summary
                      </h3>
                      <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                        <div className="flex justify-between w-full">
                          <p className="text-base dark:text-black  leading-4 text-gray-800">
                            Subtotal
                          </p>
                          <p className="text-base dark:text-black leading-4 text-gray-600">
                            ${order.totalAmount}.00
                          </p>
                        </div>

                        <div className="flex justify-between items-center w-full">
                          <p className="text-base dark:text-black  leading-4 text-gray-800">
                            Shipping
                          </p>
                          <p className="text-base dark:text-black leading-4 text-gray-600">
                            <p className="line-through">$8.00</p>
                            Free
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-black  font-semibold leading-4 text-gray-800">
                          Total
                        </p>
                        <p className="text-base dark:text-black font-semibold leading-4 text-gray-600">
                          ${order.totalAmount}.00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-userOrderColor w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-4 flex-col">
                  <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                    <div className="flex flex-col justify-start items-start flex-shrink-0">
                      <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                        <img
                          src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                          alt="avatar"
                        />
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-base dark:text-black  font-semibold leading-4 text-left text-gray-800">
                            {order.selectedAddress.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center text-gray-800 dark:text-black  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 7L12 13L21 7"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="cursor-pointer text-lg leading-5 ">
                          {order.selectedAddress.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                      <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                        <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                          <p className="text-base dark:text-black  font-semibold leading-4 text-center md:text-left text-gray-800">
                            Shipping Address
                          </p>
                          <p className="w-48 lg:w-full dark:text-black xl:w-48 text-center md:text-left text-lg  leading-5 text-gray-600">
                            {order.selectedAddress.street},{" "}
                            {order.selectedAddress.city},{" "}
                            {order.selectedAddress.region},{" "}
                            {order.selectedAddress.pinCode}
                            <p className=" text-lg dark:text-black  ">
                              {order.selectedAddress.phone}
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      ))}
    </>
  );
}
