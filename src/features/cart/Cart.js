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

  const [openModal, setOpenModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null); // New state to track selected item ID


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
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));

    // setQuantity(e.target.value);
  };
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };
// kal 
  const handleCancel = (e) => {
    setOpenModal(false); // Function to close the modal
    setSelectedItemId(null); // Reset the selected item ID
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
        <div className=" bg-gray-100 pt-20">
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
                              // SetOpenModal(item.id);
                              setOpenModal(true); // Open the modal
                              setSelectedItemId(item.id); // Set the selected item ID
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
                            showModal={openModal && selectedItemId === item.id} // Show modal based on conditions
                            onCancel={handleCancel}
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
    </>
  );
}
