import React, { FC, useEffect, useState } from "react";
import Layout from "../../hocs/Layout";
import { connect } from "react-redux";

import { ReducersStateType } from "../../redux/reducers";

import { CheckIcon, ClockIcon, XIcon } from "@heroicons/react/solid";

import { ItemCart } from "../../redux/reducers/cartReducer";
import { Link, Navigate } from "react-router-dom";
import {
  get_wishlist_items,
  get_wishlist_item_total,
  remove_wishlist_item,
} from "../../redux/actions/wishlist";

interface Props {
  items_whislist?: any;
  total_items_whislist?: any;
  isAuthenticated?: boolean | null;

  get_wishlist_items?: Function;
  get_wishlist_item_total?: Function;
  remove_wishlist_item?: Function;
}

const WhishlistPage: FC<Props> = ({
  isAuthenticated,
  items_whislist,
  total_items_whislist,
  get_wishlist_items,
  get_wishlist_item_total,
  remove_wishlist_item,
}) => {
  useEffect(() => {
    get_wishlist_items?.();
    get_wishlist_item_total?.();
  }, []);

  if (!isAuthenticated && isAuthenticated !== null) {
    return <Navigate to="/login" />;
  }
  return (
    <Layout>
      <div className="bg-white dark:bg-neutral-900">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-400">
            WhishList Items ({total_items_whislist})
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-12">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul className=" ">
                <div>
                  {items_whislist &&
                    items_whislist !== null &&
                    items_whislist !== undefined &&
                    items_whislist.length !== 0 &&
                    items_whislist.map((item: any, index: number) => {
                      let count = item.count;
                      return (
                        <div key={index}>
                          <li className="flex py-6 sm:py-10">
                            <div className="flex-shrink-0">
                              <img
                                src={item.product.get_thumbnail}
                                alt=""
                                className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                              />
                            </div>

                            <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                              <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                <div>
                                  <div className="flex justify-between">
                                    <h3 className="text-sm">
                                      <Link
                                        to={`/product/${item.product.id}`}
                                        className="font-medium text-gray-700 hover:text-gray-800 dark:text-white"
                                      >
                                        {item.product.name}
                                      </Link>
                                    </h3>
                                  </div>
                                  <div className="mt-1 flex text-sm">
                                    <p className="text-gray-500 dark:text-white">
                                      {item.product.description}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-xl font-medium text-gray-900 dark:text-white">
                                    <b>$ {item.product.price}</b>
                                  </p>
                                </div>

                                <div className="mt-4 sm:mt-0 sm:pr-9">
                                  <div className="absolute top-0 right-0">
                                    <button
                                      onClick={() =>
                                        remove_wishlist_item?.(item.product.id)
                                      }
                                      className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                    >
                                      <span className="sr-only">Remove</span>
                                      <XIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                                {item.product &&
                                item.product !== null &&
                                item.product !== undefined &&
                                item.product.quantity > 0 ? (
                                  <>
                                    <CheckIcon
                                      className="flex-shrink-0 h-5 w-5 text-green-500"
                                      aria-hidden="true"
                                    />
                                    <span className="dark:text-white">
                                      In Stock
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <ClockIcon
                                      className="flex-shrink-0 h-5 w-5 text-gray-300"
                                      aria-hidden="true"
                                    />
                                    <span>Out of Stock</span>
                                  </>
                                )}
                              </p>
                            </div>
                          </li>
                        </div>
                      );
                    })}
                </div>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};
const mapStateToProps = (state: ReducersStateType) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  items_whislist: state.Whishlist.items,
  total_items_whislist: state.Whishlist.total_items,
});

export default connect(mapStateToProps, {
  get_wishlist_items,
  get_wishlist_item_total,
  remove_wishlist_item,
})(WhishlistPage);
