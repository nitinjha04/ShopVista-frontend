import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { ITEMS_PER_PAGE } from "../../../app/constants";

import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);

  const handleShow = (order) => {};
  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      case "received":
        return "bg-green-200 text-green-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ pagination, sort }));
  }, [dispatch, page, sort]);

  return (
    <>
      <div className="overflow-x-auto w-full">
        <div className="flex  px-4 bg-gray-100 font-sans overflow-auto">
          <div className="">
            <div className="bg-white  shadow-md rounded my-6">
              <table className=" w-full table-auto">
                <thead>
                  <tr className="bg-[#92C3DC] text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 flex px-1 text-left  cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order#{" "}
                      {sort._sort === "id" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4" />
                        ))}
                    </th>
                    <th className="py-3 px-3 text-left">Items</th>
                    <th
                      className="py-3 px-3 flex text-center"
                      onClick={(e) =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Total Amount{" "}
                      {sort._sort === "totalAmount" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4" />
                        ))}
                    </th>
                    <th className="py-3 px-3 text-center">Payment Status</th>
                    <th className="py-3 px-3 text-center">Shipping Address</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th
                      className="py-3 px-3 flex  text-center"
                      onClick={(e) =>
                        handleSort({
                          sort: "createdAt",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Created{" "}
                      {sort._sort === "createdAt" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4" />
                        ))}
                    </th>

                    <th
                      className="py-3 px-3 place-items-center   text-center "
                      onClick={(e) =>
                        handleSort({
                          sort: "updatedAt",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                     Updated
                      {sort._sort === "updatedAt" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4" />
                        ))}
                      
                    </th>
                    <th className="py-3 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders?.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      {/* //! Order id */}
                      <td className="py-2 px-2 text-left whitespace-nowrap ">
                        <div className="flex items-center flex-wrap">
                          <div className="mr-2"></div>
                          <span className="font-medium ">{order.id}.</span>
                        </div>
                      </td>
                      {/* //! items */}
                      <td className="py-2 px-2 text-center ">
                        {order.items.map((item) => (
                          <div className="flex items-center ">
                            <div className="mr-2 hidden xl:flex">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.product.thumbnail}
                                alt={item.product.title}
                              />
                            </div>
                            <span>
                              {item.product.title} - #{item.quantity} - $
                              {item.product.discountedPrice}{" "}
                            </span>
                          </div>
                        ))}
                      </td>
                      {/* //! user email */}
                      {/* <td className="py-3 px-1 text-center">
                        <div className="flex  justify-center">
                          <div className=""></div>
                          <span>{order.selectedAddress.name}</span>
                        </div>
                      </td> */}
                      {/* //! total amount */}
                      <td className="py-3 px-1 text-center">
                        <div className="flex items-center justify-center">
                          ${order.totalAmount}
                        </div>
                      </td>
                      {/* PAYMENT STATUS */}
                      <td className="py-3 px-4 text-center">
                        {order.id === editableOrderId ? (
                          <select onChange={(e) => handleUpdate(e, order)}>
                            <option value="pending">Pending</option>
                            <option value="received">received</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.paymentStatus
                            )} py-1 px-3 rounded-full text-base`}
                          >
                            {order.paymentStatus}
                          </span>
                        )}
                      </td>
                      {/* //! address */}
                      <td className="py-3 px-1 text-center">
                        <div className="">
                          <div>
                            <strong>{order.selectedAddress.name}</strong>
                          </div>
                          <div> {order.selectedAddress.street} </div>
                          <div> {order.selectedAddress.city} </div>
                          <div> {order.selectedAddress.state} </div>
                          <div> {order.selectedAddress.pinCode} </div>
                          <div> {order.selectedAddress.phone} </div>
                        </div>
                      </td>
                      {/* //! status */}
                      <td className="py-3 px-4 text-center">
                        {order.id === editableOrderId ? (
                          <select onChange={(e) => handleUpdate(e, order)}>
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-base`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      {/* order created at */}
                      <td className="py-3 px-1 text-center">
                        <div className="flex items-center justify-center">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleString()
                            : null}
                        </div>
                      </td>
                      {/* order updated at */}
                      <td className="py-3 px-1 text-center">
                        <div className="flex items-center justify-center">
                          {order.updatedAt
                            ? new Date(order.updatedAt).toLocaleString()
                            : null}
                        </div>
                      </td>
                      {/* //! actions */}
                      <td className="py-3 px-1 text-center">
                        <div className="flex item-center gap-1 justify-center">
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon
                              className=" w-5 h-5"
                              onClick={(e) => handleShow(order)}
                            />
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon
                              className=" w-5 h-5"
                              onClick={(e) => handleEdit(order)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          totalItems={totalOrders}
          page={page}
          setPage={setPage}
          handlePage={handlePage}
        />
      </div>
    </>
  );
}

export default AdminOrders;
