import Layout from "../../hocs/Layout";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { get_order_detail } from "../../redux/actions/order";
import { FC, useEffect } from "react";

import { Fragment, useState } from "react";

import { Link } from "react-router-dom";

import { ReducersStateType } from "../../redux/reducers";
import LayoutDashboard from "../../hocs/LayoutDashboard";
import { ProductType } from "../../redux/reducers/productsReducer";
import ProductEsqueleton from "../../components/skeletons/ProductEsqueleton";
import CardElqueleton from "../../components/skeletons/CardElqueleton";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
interface Props {
  order?: any | null;
  get_order_detail?: Function;
}
const DashboardPaymentDetail: FC<Props> = ({ order, get_order_detail }) => {
  const params = useParams();
  const transaction_id = params.transaction_id;

  useEffect(() => {
    get_order_detail?.(transaction_id);
  }, []);

  return (
    <LayoutDashboard>
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                  <div className="bg-white">
                    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        <dl className="flex">
                          <dt className="text-gray-500">
                            Transaction ID: &nbsp;
                          </dt>
                          <dd className="font-medium text-gray-900">
                            {order?.transaction_id}
                          </dd>
                          <dt>
                            <span className="sr-only">Date</span>
                            <span
                              className="text-gray-400 mx-2"
                              aria-hidden="true"
                            >
                              &middot;
                            </span>
                          </dt>
                          <dd className="font-medium text-gray-900">
                            <time dateTime="2021-03-22">March 22, 2021</time>
                          </dd>
                        </dl>
                      </h1>

                      <div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between"></div>

                      <div className="mt-8">
                        <h2 className="sr-only">Products purchased</h2>
                        {!order ? (
                          <div className="space-y-12">
                            {[1, 2, 3].map((e: number) => {
                              return <CardElqueleton key={e} />;
                            })}
                          </div>
                        ) : (
                          <div className="space-y-24">
                            {order ? (
                              order.order_items?.map(
                                (order_producrt_item: any, index: number) => (
                                  <div
                                    key={index}
                                    className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
                                  >
                                    <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                                      <div className="group relative">
                                        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                          <img
                                            src={order_producrt_item.photo}
                                            alt=""
                                            className="w-full h-full object-center object-cover lg:w-full lg:h-full  border"
                                          />
                                        </div>
                                      </div>
                                      <h3 className="text-lg font-medium text-gray-900">
                                        <Link
                                          to={`/product/${order_producrt_item.id}`}
                                        >
                                          {order_producrt_item.name}
                                        </Link>
                                      </h3>
                                      <p className="font-medium text-gray-900 mt-1">
                                        Transaction ID: {order.transaction_id}
                                      </p>
                                      <p className="text-gray-500 mt-3">Desc</p>
                                    </div>
                                    <div className="sm:col-span-12 md:col-span-7">
                                      <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                                        <div>
                                          <dt className="font-medium text-gray-900">
                                            Delivery address
                                          </dt>
                                          <dd className="mt-3 text-gray-500">
                                            <span className="block">
                                              {order.address_line_1}
                                            </span>
                                            <span className="block">
                                              {order.address_line_2}
                                            </span>
                                          </dd>
                                        </div>
                                        <div>
                                          <dt className="font-medium text-gray-900">
                                            Shipping
                                          </dt>
                                          <dd className="mt-3 text-gray-500 space-y-3">
                                            <p>$ {order.shipping_price}</p>
                                            <p>$ {order.amount} Total Cost</p>
                                          </dd>
                                        </div>
                                      </dl>
                                      <p className="font-medium text-gray-900 mt-6 md:mt-10">
                                        Status: {order.status}
                                      </p>
                                      <div className="mt-6">
                                        {order.status !== "canceled" ? (
                                          <div className="bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                              className={`h-2 bg-${
                                                order.status === "delivered"
                                                  ? "green"
                                                  : "indigo"
                                              }-600 rounded-full`}
                                              style={{
                                                width: `calc((${
                                                  order.status ===
                                                  "not_processed"
                                                    ? 0
                                                    : order.status ===
                                                      "processed"
                                                    ? 1.1
                                                    : order.status === "shipped"
                                                    ? 2
                                                    : order.status ===
                                                      "delivered"
                                                    ? 4
                                                    : 100
                                                } * 2 + 1) / 8 * 100%)`,
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <h2 className="text-lg text-red-600">
                                            Order Canceled{" "}
                                          </h2>
                                        )}
                                        <div className="hidden sm:grid grid-cols-4 font-medium text-gray-600 mt-6">
                                          <div
                                            className={classNames(
                                              order.status === "not_processed"
                                                ? "text-indigo-600"
                                                : "",
                                              "text-center"
                                            )}
                                          >
                                            Order placed
                                          </div>
                                          <div
                                            className={classNames(
                                              order.status === "processed"
                                                ? "text-indigo-600"
                                                : "",
                                              "text-center"
                                            )}
                                          >
                                            Processing
                                          </div>
                                          <div
                                            className={classNames(
                                              order.status === "shipped"
                                                ? "text-indigo-600"
                                                : "",
                                              "text-center"
                                            )}
                                          >
                                            Shipped
                                          </div>
                                          <div
                                            className={classNames(
                                              order.status === "delivered"
                                                ? "text-green-600"
                                                : "",
                                              "text-right"
                                            )}
                                          >
                                            Delivered
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )
                            ) : (
                              <ProductEsqueleton />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="space-y-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutDashboard>
  );
};

const mapStateToProps = (state: ReducersStateType) => ({
  order: state.Orders.order,
});

export default connect(mapStateToProps, {
  get_order_detail,
})(DashboardPaymentDetail);
