import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { increment, incrementAsync, selectCount } from "./counterSlice";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import {
  selectItems,
  updateCartAsync,
  deleteItemFromCartAsync,
  selectCartLoaded,
} from "./cartSlice";
import { discountedPrice } from "../../app/constants";

import "../../index.css";
import Modal from "../common/Modal";

export default function Cart() {
  const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded);

  const [openModal, SetOpenModal] = useState(false);
  console.log('openModal', openModal)

  const [quantity, setQuantity] = useState(1);

  const totalAmount = items.reduce(
    (amount, item) => item.product.discountedPrice * item.quantity + amount,
    0
  );
  const totalItem = items.reduce((total, item) => item.quantity + total, 0);

  const [open, setOpen] = useState(true);
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const handleQuantity = (e, item) => {
    console.log(item.id);
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));

    // setQuantity(e.target.value);
  };
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {!items.length && cartLoaded && <Navigate to="/" replace={true} />}

      <>
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n    @layer utilities {\n    input[type="number"]::-webkit-inner-spin-button,\n    input[type="number"]::-webkit-outer-spin-button {\n      -webkit-appearance: none;\n      margin: 0;\n    }\n  }\n',
          }}
        />
        <div className="h-screen bg-gray-100 pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg h-96 overflow-y-auto   md:w-2/3">
              {items.map((item) => (
                <div>
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <img
                      src={item.product.thumbnail}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {item.product.title}
                        </h2>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <span
                            onClick={() => {
                              if (item.quantity === 1) {
                                return;
                                SetOpenModal(item.id);
                              } else {
                                handleQuantity(
                                  { target: { value: item.quantity - 1 } },
                                  item
                                );
                              }
                            }}
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            -{" "}
                          </span>
                          <input
                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            onChange={(e) => handleQuantity(e, item)}
                            min={1}
                            value={item.quantity}
                          />
                          <span
                            onClick={() =>
                              handleQuantity(
                                { target: { value: item.quantity + 1 } },
                                item
                              )
                            }
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <h4 className=" mb-0.75">Price :</h4>
                          <p className="text-sm ">
                            $ {item.product.discountedPrice}{" "}
                          </p>
                          <XCircleIcon
                            onClick={(e) => {
                              SetOpenModal(item.id);
                            }}
                            className=" w-6 h-6 cursor-pointer"
                          />
                        </div>

                        <div className="flex">
                          <Modal
                            title={`Delete ${item.product.title}`}
                            message="Are you Sure About that ?"
                            action="Delete"
                            cancel="Cancel"
                            OpenAction={(e) => handleRemove(e, item.id)}
                            showModal={openModal === item.id}
                          ></Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Sub total */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">${totalAmount}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700 line-through">$4.99</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">${totalAmount} USD</p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <Link to="/checkout">
                <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                  Check out
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>

      {/* <div className="mx-auto bg-white mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className=" py-6 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Shopping Cart
        </h2>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.href}>{item.title}</a>
                        </h3>
                        <p className="ml-4">
                          ${" "}
                          {Math.round(
                            item.price * (1 - item.discountPercentage / 100)
                          )}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        Qty
                        <select
                          onChange={(e) => handleQuantity(e, item)}
                          value={item.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          onClick={(e) => handleRemove(e, item.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
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
            <p>{totalItem} Items</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$ {totalAmount}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className=" mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
                <button
                  type="button"
                  className=" font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div> */}
    </>
  );
}
