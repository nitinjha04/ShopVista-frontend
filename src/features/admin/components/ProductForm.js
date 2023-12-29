import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectAllBrands,
  selectAllCategories,
  selectedProductById,
  updateProductAsync,
} from "../../product-list/productSlice";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import { toast } from "react-toastify";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const brands = useSelector(selectAllBrands);
  const category = useSelector(selectAllCategories);
  const selectedProduct = useSelector(selectedProductById);

  const dispatch = useDispatch();

  const [openModal, SetOpenModal] = useState(false);

  const params = useParams();

  const colors = [
    {
      name: "White",
      class: "bg-white",
      selectedClass: "ring-gray-400",
      id: "white",
    },
    {
      name: "Gray",
      class: "bg-gray-200",
      selectedClass: "ring-gray-400",
      id: "gray",
    },
    {
      name: "Black",
      class: "bg-gray-900",
      selectedClass: "ring-gray-900",
      id: "black",
    },
  ];

  const sizes = [
    { name: "XXS", inStock: false, id: "XXS" },
    { name: "XS", inStock: true, id: "XS" },
    { name: "S", inStock: true, id: "S" },
    { name: "M", inStock: true, id: "M" },
    { name: "L", inStock: true, id: "L" },
    { name: "XL", inStock: true, id: "XL" },
    { name: "2XL", inStock: true, id: "2XL" },
    { name: "3XL", inStock: true, id: "3XL" },
  ];

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct);
    }
  }, [params.id, dispatch]);
  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("image4", selectedProduct.images[3]);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue(
        "colors",
        selectedProduct.colors.map((size) => size.id)
      );
      setValue(
        "sizes",
        selectedProduct.sizes.map((color) => color.id)
      );
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          const product = { ...data };
          product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.image4,
            product.thumbnail,
          ];
          delete product["image1"];
          delete product["image2"];
          delete product["image3"];
          delete product["image4"];
          product.colors = product.colors.map((color) =>
            colors.find((clr) => clr.id === color)
          );
          product.sizes = product.sizes.map((size) =>
            sizes.find((siz) => siz.id === size)
          );
          product.price = +product.price;
          product.discountPercentage = +product.discountPercentage;
          // product.rating = +product.rating;
          product.stocks = +product.stocks;

          if (params.id) {
            product.id = params.id;
            product.rating = +selectedProduct.rating || 0;
            dispatch(updateProductAsync(product));
            toast.success("Product Updated", {
              position: "top-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "dark",
            });
          } else {
            dispatch(createProductAsync(product));
            toast.success("Product Created", {
              position: "top-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "dark",
            });
          }
        })}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* //! title */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title Of The Product
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center text-gray-500 sm:text-sm"></span>
                    <input
                      type="text"
                      {...register("title", {
                        required: "title is required",
                      })}
                      id="title"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              {/* //! Description */}
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Information Of Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* //! price */}

              <div className="sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register("price", {
                      required: "price is required",
                      min: 1,
                      max: 10000,
                    })}
                    id="price"
                    autoComplete="given-name"
                    className="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* //! discount percentage */}

              <div className="sm:col-span-1">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount
                </label>
                <div className="mt-2">
                  <input
                    type="integer"
                    {...register("discountPercentage", {
                      required: "discountPercentage is required",
                      min: 0,
                      max: 100,
                    })}
                    id="discountPercentage"
                    className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* //! rating */}

              {/* <div className="sm:col-span-1">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Rating
                </label>
                <div className="mt-2">
                  <input
                    id="rating"
                    {...register("rating", {
                      required: "rating is required",
                      min: 0.1,
                      max: 5,
                    })}
                    type="number"
                    autoComplete="rating"
                    className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div> */}

              {/* //! stock */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stocks
                </label>
                <div className="mt-2">
                  <input
                    id="stock"
                    {...register("stock", {
                      required: "price is required",
                      min: 1,
                    })}
                    type="number"
                    autoComplete="stock"
                    className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* colors */}
              <div className="col-span-full">
                <label
                  htmlFor="colors"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Colors
                </label>
                <div className="mt-2">
                  {colors.map((color) => (
                    <>
                      <input
                        type="checkbox"
                        {...register("colors", {})}
                        key={color.id}
                        value={color.id}
                        className="ml-3"
                      />{" "}
                      {color.name}
                    </>
                  ))}
                </div>
              </div>
              {/* sizes */}
              <div className="col-span-full">
                <label
                  htmlFor="sizes"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sizes
                </label>
                <div className="mt-2">
                  {sizes.map((size) => (
                    <>
                      <input
                        type="checkbox"
                        {...register("sizes", {})}
                        key={size.id}
                        value={size.id}
                        className="ml-3"
                      />{" "}
                      {size.name}
                    </>
                  ))}
                </div>
              </div>

              {/* //! images  */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <input
                    id="thumbnail"
                    {...register("thumbnail", {
                      required: "thumbnail is required",
                    })}
                    type="text"
                    autoComplete="thumbnail"
                    placeholder="https://i.dummyjson.com/thumbnail.jpg"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* //! images  */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <input
                    id="image1"
                    name="image1"
                    type="text"
                    autoComplete="image1"
                    {...register("image1", {
                      required: "image1 is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* //! images  */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <input
                    {...register("image2", {
                      required: "image2 is required",
                    })}
                    id="image2"
                    name="image2"
                    type="text"
                    autoComplete="image"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* //! images  */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <input
                    {...register("image3", {
                      required: "image3 is required",
                    })}
                    id="image3"
                    name="image3"
                    type="text"
                    autoComplete="image3"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* //! images  */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="image4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 4
                </label>
                <div className="mt-2">
                  <input
                    {...register("image4", {
                      required: "image4 is required",
                    })}
                    id="image4"
                    name="image4"
                    type="text"
                    autoComplete="image4"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* //! brand */}

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", {
                      required: "brand is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">--choose brand--</option>
                    {brands.map((brand) => (
                      <option value={brand.value}>{brand.value}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* //! category */}

              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    {...register("category", {
                      required: "category is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">--choose category--</option>
                    {category.map((category) => (
                      <option value={category.value}>{category.value}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notification (not used) */}

          {/* <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Push Notifications
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-everything"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div> */}
        </div>

        <div className="mt-6 flex items-center  justify-between ">
          <div>
            <div>
              {selectedProduct && (
                <div>
                  <Link to="/admin">
                    <button
                      onClick={(e) => {
                        SetOpenModal(selectedProduct.id);
                      }}
                      type="submit"
                      className=" left-0  rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Delete
                    </button>
                  </Link>

                  <Modal
                    title={`Delete ${selectedProduct.title}`}
                    message="Are you Sure About that ?"
                    action="Delete"
                    cancel="Cancel"
                    // OpenAction={(e) => handleRemove(e, selectedProduct.id)}
                    OpenAction={handleDelete}
                    showModal={openModal === selectedProduct.id}
                  ></Modal>
                </div>
              )}
            </div>
          </div>
          <div className="gap-x-6 flex items-center">
            <Link to="/admin">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
