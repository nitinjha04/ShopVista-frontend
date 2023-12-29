import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectAllBrands,
  selectAllCategories,
  selectTotalItems,
  fetchCategoriesAsync,
  fetchBrandsAsync,
  fetchProductByTitleAsync,
  selectProductListStatus,
} from "../../product-list/productSlice";
import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { selectLoggedInUserToken } from "../../auth/authSlice";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";


const sortOptions = [
  { name: "Best Rating", sort: "#rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  const totalItems = useSelector(selectTotalItems);
  const user = useSelector(selectLoggedInUserToken);
  const items = useSelector(selectItems);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
  ];

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchTitle, setSearchTitle] = useState({});
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }

    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    // console.log({ sort });
    setSort(sort);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleCart = (e, product) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      const newItem = {
        ...product,
        product: product.id,
        quantity: 1,
        user: user.id,
      };

      dispatch(addToCartAsync(newItem));
      toast.success("Product Added", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } else {
      console.log("item already added");
      console.log(product.id);
      toast.warn("Product Already Added", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleSearchByTitle = (e) => {
    dispatch(fetchProductByTitleAsync(e.target.value));
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(
      fetchProductsByFiltersAsync({
        filter,
        sort,
        pagination,
        admin: true,
        searchTitle,
      })
    );
  }, [dispatch, filter, sort, page, searchTitle]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, []);

  return (
    <div className="App">
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilter
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            handleFilter={handleFilter}
            filters={filters}
          />

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                All Products
              </h1>

              <div className="flex items-center">
                {/* //! search box */}
                <div class="relative  sm:block mx-3  ">
                  <label class="sr-only" for="search">
                    {" "}
                    Search{" "}
                  </label>

                  <input
                    class="focus:outline-none h-10 w-full rounded-lg border-none bg-gray-700 pe-10 ps-4 text-sm shadow-sm sm:w-56"
                    id="search"
                    type="search"
                    placeholder="Search website..."
                    autoComplete="off"
                    onChange={(e) => {
                      setSearchTitle(e.target.value);
                      handleSearchByTitle(e);
                    }}
                  />

                  <button
                    type="button"
                    class="absolute end-1 top-1/2 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                  >
                    <span class="sr-only">Search</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                                onClick={(e) => handleSort(e, option)}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <DesktopFilter handleFilter={handleFilter} filters={filters} />

                {/* Product grid */}

                <div className="lg:col-span-3">
                  <div className=" px-8">
                    <Link
                      to="/admin/product-form"
                      className=" mt-1 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500  sm:w-auto"
                    >
                      Add New Product
                    </Link>
                  </div>
                  <ProductGrid products={products} handleCart={handleCart} />
                </div>
              </div>
            </section>

            {/* //! this is page numbers */}

            <Pagination
              totalItems={totalItems}
              page={page}
              setPage={setPage}
              handlePage={handlePage}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) {
  return (
    <div>
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map ((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    onChange={(e) =>
                                      handleFilter(e, section, option)
                                    }
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
function DesktopFilter({ handleFilter, filters }) {
  return (
    <div>
      <form className="hidden lg:block">
        {filters.map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map ((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          onChange={(e) => handleFilter(e, section, option)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </div>
  );
}
function Pagination({ handlePage, page, setPage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: totalPages }).map((el, index) => (
              <div
                key={index}
                onClick={(e) => handlePage(index + 1)}
                href="#"
                aria-current="page"
                className={`relative z-10 inline-flex items-center ${
                  index + 1 === page
                    ? "bg-indigo-600 text-white"
                    : " text-gray-400"
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
function ProductGrid({ products, selectedProduct, handleDelete, handleCart }) {
  const status = useSelector(selectProductListStatus);
  return (
    <div>
      {status === "loading" ? (
        <section class="bg-white shadow-lg transform  scale-105 duration-300 dark:bg-gray-900">
          <div class="container px-6 py-10 mx-auto animate-pulse">
            <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>

              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>

              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>

              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>

              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>

              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>

              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>

              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      <div className="bg-personalColour">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-4">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products && products.length > 0 ? (
              products.map((product) => (
                <>
                  <Link
                    key={product.id}
                    to={`/product-detail/${product.id}`}
                    className=" max-w-2xl mx-auto"
                  >
                    <div className=" aspect-h-1 aspect-w-1 min-h-60 w-full overflow-auto shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300  lg:h-full lg:w-full   bg-cardColour  rounded-lg max-w-sm  dark:border-gray-700">
                      <div className="  ">
                        <img
                          className="rounded-t-lg p-8 "
                          src={product.thumbnail}
                          alt={product.title}
                        />
                      </div>
                      <div className="px-3 pb-3 relative   ">
                        <span>
                          <h4 className="text-gray-900 font-semibold text-lg tracking-tight">
                            {product.title}
                          </h4>
                        </span>
                        <div className="flex items-center mt-2.5 mb-5">
                          <StarRatings
                            numberOfStars={5}
                            starDimension="15px"
                            starSpacing="1px"
                            rating={product.rating}
                            starRatedColor="blue"
                            starEmptyColor="white"
                          />
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded  ml-3">
                            {product.rating}
                          </span>
                        </div>
                        <div className="flex z-50 relative items-center flex-row justify-between">
                          <span className="text-base font-bold text-gray-900">
                            ${product.discountedPrice}
                          </span>
                          <button
                            onClick={(e) => handleCart(e, product)}
                            className="text-white   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>

                      {product.deleted ? (
                        <p className="text-sm text-center text-red-800 my-3">
                          Product Deleted
                        </p>
                      ) : null}
                      {product.stock <= 0 && (
                        <div>
                          <p className="text-sm text-center text-red-400">
                            {" "}
                            Out Of Stock
                          </p>
                        </div>
                      )}
                        <div className=" z-40 relative flex justify-center m-2">
                          <Link to={`/admin/product-form/edit/${product.id}`}>
                            <button className=" mt-1 inline-flex w-full justify-center rounded-md bg-red-600 px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500  sm:w-auto">
                              Edit / Delete
                            </button>
                          </Link>
                        </div>
                    </div>
                  </Link>
                </>
              ))
            ) : (
              <>
                {" "}
                <div className="text-center  h-screen px-4 bg-white place-content-center">
                  <h1 className="tracking-widest text-gray-500 uppercase">
                    404 | Item Not Found
                  </h1>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
