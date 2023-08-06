import React, { FC } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ReducersStateType } from "../redux/reducers";
import { connect } from "react-redux";
import { ItemCart } from "../redux/reducers/cartReducer";
import { get_items, get_item_total, get_total } from "../redux/actions/cart";
import { Link } from "react-router-dom";
interface Props {
  amount?: number;
  compare_amount?: number;
  total_items?: number;
  items?: ItemCart[] | null;
  get_items?: Function;
  get_total?: Function;
  get_item_total?: Function;
  open: boolean;
  setOpen: Function | any;
}

const CartSlide: FC<Props> = ({
  open,
  setOpen,
  items,
  amount,
  compare_amount,
  total_items,
  get_items,
  get_total,
  get_item_total,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500  bg-opacity-75 transition-opacity " />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl dark:bg-neutral-800">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-300">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {items &&
                              items !== null &&
                              items !== undefined &&
                              items.length !== 0 &&
                              items.map((item: any, index: any) => (
                                <li key={index} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:text-gray-300">
                                    <img
                                      src={item.product.get_thumbnail}
                                      alt=""
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link
                                            to={`/product/${item.product.id}`}
                                            className="dark:text-gray-300"
                                          >
                                            {item.product.name}
                                          </Link>
                                        </h3>
                                        <p className="ml-4 dark:text-gray-300">
                                          ${item.product.price}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500"></p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500 dark:text-gray-300">
                                        Qty <b>{item.count}</b>
                                      </p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-orange-600 hover:text-orange-500"
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
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6 dark:border-neutral-700">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p className="dark:text-gray-300">Subtotal</p>
                        <p>$ {amount}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          to="/cart"
                          className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700"
                        >
                          Manage you Cart
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-orange-600 hover:text-orange-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const mapStateToProps = (state: ReducersStateType) => ({
  items: state.Cart.items,
  amount: state.Cart.amount,
  compare_amount: state.Cart.compare_amount,
  total_items: state.Cart.total_items,
});

export default connect(mapStateToProps, {
  get_items,
  get_total,
  get_item_total,
})(CartSlide);
