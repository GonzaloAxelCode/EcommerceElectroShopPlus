import React, { FC, useEffect, useState } from "react";
import Layout from "../../hocs/Layout";
import { connect } from "react-redux";
import CartItem from "../../components/CartItem";
import { ReducersStateType } from "../../redux/reducers";

import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

import { ItemCart } from "../../redux/reducers/cartReducer";
import { Link } from "react-router-dom";
import { get_items, get_item_total, get_total } from "../../redux/actions/cart";

interface Props {
  amount?: number;
  compare_amount?: number;
  total_items?: number;
  items?: ItemCart[] | null;
  isAuthenticated?: boolean | null;
  get_items?: Function;
  get_total?: Function;
  get_item_total?: Function;
}

const CartPage: FC<Props> = ({
  isAuthenticated,
  items,
  amount,
  compare_amount,
  total_items,
  get_items,
  get_total,
  get_item_total,
}) => {
  const [loadingPrices, setLoadingPrices] = useState(false);
  useEffect(() => {
    get_items?.();
    get_total?.();
    get_item_total?.();
  }, [loadingPrices]);

  const checkoutButton = () => {
    if (total_items && total_items < 1) {
      return (
        <Link to="/shop">
          <button className="w-full bg-orange-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-orange-500">
            Buscar items
          </button>
        </Link>
      );
    } else if (!isAuthenticated) {
      return (
        <Link to="/login">
          <button className="w-full bg-orange-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-orange-500">
            Login
          </button>
        </Link>
      );
    } else {
      return (
        <Link to="/checkout">
          <button className="w-full bg-orange-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-orange-500">
            Checkout
          </button>
        </Link>
      );
    }
  };
  return (
    <Layout>
      <div className="bg-white dark:bg-neutral-900">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl  dark:text-gray-400">
            Shopping Cart Items ({total_items})
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only ">
                Items in your shopping cart
              </h2>

              <ul className="">
                <div>
                  {items &&
                    items !== null &&
                    items !== undefined &&
                    items.length !== 0 &&
                    items.map((item: any, index: number) => {
                      let count = item.count;
                      return (
                        <div key={index}>
                          <CartItem
                            setLoadingPrices={setLoadingPrices}
                            loadingPrices={loadingPrices}
                            item={item}
                            count={count}
                          />
                        </div>
                      );
                    })}
                </div>
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 dark:bg-neutral-800"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900 dark:text-white"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600 dark:text-gray-400">
                    Subtotal
                  </dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">
                    $ {compare_amount?.toFixed(2)}
                  </dd>
                </div>

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between dark:border-neutral-700">
                  <dt className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span>Shipping estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how shipping is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">
                    $5.00
                  </dd>
                </div>

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between dark:border-neutral-700">
                  <dt className="flex text-sm text-gray-600 dark:text-gray-400">
                    <span>Tax estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how tax is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">
                    $8.32
                  </dd>
                </div>

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between dark:border-neutral-700">
                  <dt className="text-base font-medium text-gray-900 dark:text-gray-400">
                    Order total
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    ${amount?.toFixed(2)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">{checkoutButton()}</div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};
const mapStateToProps = (state: ReducersStateType) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  items: state.Cart.items,
  amount: state.Cart.amount,
  compare_amount: state.Cart.compare_amount,
  total_items: state.Cart.total_items,
});

export default connect(mapStateToProps, {
  get_items,
  get_total,
  get_item_total,
})(CartPage);
