import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link,useLocation  } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";
import { selectLoggedInUser } from "../auth/authSlice";

import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoSearch,
} from "react-icons/io5";

import logo from "../../images/main-logo.png";
import people from "../../images/people.png";
import { selectUserInfo } from "../user/userSlice";
// import background from "../../images/baground.png";

const navigation = [
  { name: "Home", link: "/", user: true},
  { name: "Admin", link: "/admin", admin: true},
  { name: "Orders", link: "/admin/orders", admin: true},
];
const userNavigation = [
  { name: "Your Profile", link: "/profile" },
  { name: "My Orders", link: "/my-orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ children }) {
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);
  const location = useLocation(); 

  return (
    <div>
      <>
        {userInfo && (
          <div className="min-h-full bg-personalColour w-full shadow-lg ">
            <Disclosure as="nav" className="bg-navColour relative ">
              {({ open }) => (
                <>
                  <div className="mx-auto max-w-full shadow-lg dark:shadow-black/40 sm:px-6 lg:px-8">
                    <div className="flex h-16 drop items-center justify-between">
                      <div className="flex items-center">
                        <Link to="/">
                          <div className="flex-shrink-0">
                            <img
                              className="  h-8 w-40"
                              src={logo}
                              alt="Your Company"
                            />
                          </div>
                        </Link>
                        <div className="hidden md:block">
                          <div className=" nav-text ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) =>
                              item[userInfo.role] ? (
                                <Link
                                  key={item.name}
                                  to={item.link}
                                  className={classNames(
                                    item.link === location.pathname
                                      ? "bg-[#1d3557] text-white   drop-shadow-10xl"
                                      : "text-gray-300 hover:bg-[#1d3557]  transform ease-in  hover:text-white  drop-shadow-10xl",
                                    "rounded-md px-3 py-2 text-sm font-medium"
                                  )}
                                  // className={
                                  //   item.current
                                  //     ? "text-white drop-shadow-10xl bg-black"
                                  //     : "text-gray-300 hover:bg-[#1d3557] transform ease-in hover:text-white drop-shadow-10xl rounded-md px-3 py-2 text-sm font-medium"
                                  // }
                                  aria-current={
                                    item.current ? "page" : undefined
                                  }
                                >
                                  {item.name}
                                </Link>
                              ) : null
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <Link to="/my-cart">
                            <button
                              type="button"
                              className=" flex gap-4 relative rounded-full  p-1  hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                              <span className="absolute -inset-1.5" />
                              <ShoppingCartIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </Link>
                          {items.length > 0 && (
                            <span className=" z-50 inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                              {items.length}
                            </span>
                          )}

                          {/* Profile dropdown */}
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 p-1 hover:translate-x-1 transform duration-300 ease-in-out bg-white rounded-full"
                                  src={people}
                                  alt=""
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <Link
                                        to={item.link}
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>

                  <Disclosure.Panel className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                      {navigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "block rounded-md px-3 py-2 text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                    <div className="border-t border-gray-700 pb-3 pt-4">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={userInfo.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">
                            {userInfo.name}
                          </div>
                          <div className="text-sm font-medium leading-none text-gray-400">
                            {userInfo.email}
                          </div>
                        </div>
                        <Link to="/my-cart">
                          <button
                            type="button"
                            className="relative ml-auto flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                        {items.length > 0 && (
                          <span className=" z-50 inline-flex items-center rounded-md bg-red-50 mb-7 -ml-3 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {items.length}
                          </span>
                        )}
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        {userNavigation.map((item) => (
                          <Link to={item.link}>
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                              {item.name}
                            </Disclosure.Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <main>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-4 bg-personalColour">
                {children}
              </div>
            </main>
          </div>
        )}

        {/* Footer */}
        <div class="max-w-auto mt-5 mx-9">
          <footer class="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 ">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023 All Rights Reserved.
            </span>
            <ul class="flex flex-wrap items-center mt-3 sm:mt-0">
              <li>
                <Link
                  to="https://twitter.com/CoderMonkey19"
                  class=" mr-4 px-2 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
                >
                  <IoLogoTwitter className="h-4 w-4 "></IoLogoTwitter>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.linkedin.com/in/nitin-jha-68a556276/"
                  class=" mr-4 px-2 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
                  target="_blank"
                >
                  <IoLogoLinkedin className="shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 h-4 w-4 "></IoLogoLinkedin>
                </Link>
              </li>
              <li>
                <Link
                  to="https://github.com/nitinjha04"
                  target="_blank"
                  class=" mr-4 px-2 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
                >
                  <IoLogoGithub className="shadow-lg hover:shadow-xl hover:transform hover:scale-255 duration-300 h-4 w-4 "></IoLogoGithub>
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  to="/contact"
                  class=" text-sm text-gray-500 dark:text-gray-400"
                >
                  <UserCircleIcon className="shadow-lg hover:shadow-xl hover:transform hover:scale-255 duration-300 h-5 w-5 mb-0"></UserCircleIcon>
                </Link>
              </li>
            </ul>
          </footer>
        </div>
      </>
    </div>
  );
}

export default Navbar;
