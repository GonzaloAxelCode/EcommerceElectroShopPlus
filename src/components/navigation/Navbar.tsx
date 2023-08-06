import { Fragment, FC, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { get_categories } from "../../redux/actions/caegories";
import { get_search_products } from "../../redux/actions/product";
import {
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  ShieldCheckIcon,
  ViewGridIcon,
  XIcon,
  ViewListIcon,
  ShoppingBagIcon,
  SearchIcon,
  HeartIcon,
} from "@heroicons/react/outline";

import { ReducersStateType } from "../../redux/reducers";
import { Link, Navigate } from "react-router-dom";
import GuestLinks from "./GuestLinks";
import AuthLinks from "./AuthLinks";

import { get_items, get_item_total, get_total } from "../../redux/actions/cart";
import {
  get_wishlist_items,
  get_wishlist_item_total,
} from "../../redux/actions/wishlist";
import Switcher from "../Switcher";
import CartSlide from "../CartSlide";
export const solutions = [
  {
    name: "Store",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "/shop",
    icon: ShoppingBagIcon,
  },
  {
    name: "Dashboard",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "/dashboard",
    icon: ChartBarIcon,
  },
  {
    name: "Orders & Payments",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "/dashboard/payments",
    icon: ViewListIcon,
  },
];
interface Props {
  isAuthenticated?: boolean | null;
  user?: any;
  get_categories?: Function;
  logout?: Function;
  categories?: any;
  total_items_cart?: number;
  total_items_total?: Function;
  get_item_total?: Function;
  get_search_products?: Function;
  get_items?: Function;
  get_total?: Function;
  get_wishlist_items?: Function;
  get_wishlist_item_total?: Function;
  total_items_wishlist?: any;
}

const Navbar: FC<Props> = ({
  isAuthenticated,
  user,
  logout,
  categories,
  get_categories,
  get_search_products,
  total_items_cart,
  get_item_total,
  get_items,
  get_total,
  get_wishlist_items,
  get_wishlist_item_total,
  total_items_wishlist,
}) => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [redirectToSearch, setRedirectToSearch] = useState(false);
  const [openSlideCart, setOpenSlideCart] = useState(false);
  const [formData, setFormData] = useState({
    category_id: 0,
    search: "",
  });
  const { category_id, search } = formData;
  useEffect(() => {
    get_items?.();
    get_categories?.();
    get_item_total?.();
    get_total?.();
    get_wishlist_items?.();
    get_wishlist_item_total?.();
  }, []);

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setSearchLoading(true);
    localStorage.setItem("search_term", search);
    await get_search_products?.(search, category_id);
    setFormData({
      search: "",
      category_id: 0,
    });
    if (window.location.pathname === "/search") {
      setRedirectToSearch(false);
    } else {
      setRedirectToSearch(true);
    }
    setSearchLoading(false);
  };

  const handleSubmit = async () => {
    setSearchLoading(true);
    localStorage.setItem("search_term", search);
    await get_search_products?.(search, category_id);
    setFormData({
      search: "",
      category_id: 0,
    });
    if (window.location.pathname === "/search") {
      setRedirectToSearch(false);
    } else {
      setRedirectToSearch(true);
    }
    setSearchLoading(false);
  };

  if (redirectToSearch) {
    return <Navigate to={`/search`} />;
  }

  return (
    <Popover className="relative bg-white dark:bg-neutral-900">
      <div
        className="absolute inset-0  z-30 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
          <div>
            <Link to="/" className="flex">
              <img
                className="h-8 w-auto sm:h-10"
                src="https://res.cloudinary.com/ddksrkond/image/upload/v1663683826/media/photo/2022/09/4667ec21-129a-4f83-8e08-9ed47cfd4176_r1nhmg.png"
                alt=""
              />
            </Link>
          </div>

          <div className="flex-1 flex">
            <form
              onSubmit={(e: any) => onSubmit(e)}
              className="w-full flex md:ml-0 ml-4"
            >
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <div className="relative w-full flex items-center text-gray-400 focus-within:text-gray-600 ">
                <input
                  id="search-field"
                  className="bg-transparent block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm  dark:transparent dark:text-gray-400"
                  type="text"
                  value={search}
                  onChange={(e: any) => onChange(e)}
                  name="search"
                  placeholder="Que buscas hoy ..."
                />
                <span onClick={handleSubmit} className="cursor-pointer">
                  {searchLoading ? (
                    <span>
                      <div id="circle5"></div>
                    </span>
                  ) : (
                    <SearchIcon
                      className="h-5 w-5 cursor-pointer"
                      aria-hidden="true"
                    />
                  )}
                </span>
                <div className="mt-1 mx-1 px-2 py-1">
                  <select
                    name="category_id"
                    className="rounded-full font-medium text-gray-400 outline-0 cursor-pointer dark:bg-neutral-900"
                    onChange={(e: any) => onChange(e)}
                  >
                    <option
                      value="0"
                      className="font-medium text-gray-400 outline-0"
                    >
                      All
                    </option>
                    {categories &&
                      categories !== null &&
                      categories !== undefined &&
                      categories.map((category: any, index: any) => (
                        <option
                          key={index}
                          value={category.id}
                          className="font-medium text-gray-400 p-1 outline-0 cursor-pointer"
                        >
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className="-mr-2 -my-2 md:hidden flex items-center">
            <Link
              to="/cart"
              className="bg-white rounded-md p-2 mr-3 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 first-letter:
                        dark:bg-neutral-800
              "
            >
              <span className="sr-only">Open menu</span>

              <div className="cursor-pointer relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#6b7280"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span
                  style={{
                    backgroundColor: "#6b7280",
                    fontSize: "12px",
                  }}
                  className="absolute right-0 top-0 rounded-full w-4 h-4 top right p-0 m-0 text-white  leading-tight text-center"
                >
                  {total_items_cart}
                </span>
              </div>
            </Link>
            {!isAuthenticated && isAuthenticated !== null ? (
              <></>
            ) : (
              <Link
                to="/wishlist"
                className="bg-white mr-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500
                  dark:bg-neutral-800
                "
              >
                <span className="sr-only">Open menu</span>

                <div className="cursor-pointer relative">
                  <HeartIcon
                    className="h-7 w-7 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      backgroundColor: "#6b7280",
                      fontSize: "12px",
                    }}
                    className="absolute right-0 top-0 rounded-full w-4 h-4 top right p-0 m-0 text-white  leading-tight text-center"
                  >
                    {total_items_wishlist}
                  </span>
                </div>
              </Link>
            )}
            <Popover.Button
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500
              dark:bg-neutral-800
            "
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex space-x-8">
              <Link
                to="/shop"
                className="text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-400"
              >
                Store
              </Link>
            </Popover.Group>

            <div className="flex items-center space-x-3">
              <div className="-mr-2 -my-2 md:hidden flex items-center">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <CartSlide open={openSlideCart} setOpen={setOpenSlideCart} />
              <Link
                to="#"
                onClick={() => setOpenSlideCart(true)}
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 dark:bg-neutral-700"
              >
                <span className="sr-only">Open menu</span>

                <div className="cursor-pointer relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#6b7280"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span
                    style={{
                      backgroundColor: "#6b7280",
                      fontSize: "12px",
                    }}
                    className="absolute right-0 top-0 rounded-full w-4 h-4 top right p-0 m-0 text-white  leading-tight text-center"
                  >
                    {total_items_cart}
                  </span>
                </div>
              </Link>
              {!isAuthenticated && isAuthenticated !== null ? (
                <></>
              ) : (
                <Link
                  to="/wishlist"
                  className="bg-white  rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 dark:bg-neutral-700"
                >
                  <span className="sr-only">Open menu</span>

                  <div className="cursor-pointer relative">
                    <HeartIcon
                      className="h-7 w-7 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span
                      style={{
                        backgroundColor: "#6b7280",
                        fontSize: "12px",
                      }}
                      className="absolute right-0 top-0 rounded-full w-4 h-4 top right p-0 m-0 text-white  leading-tight text-center"
                    >
                      {total_items_wishlist}
                    </span>
                  </div>
                </Link>
              )}
              {isAuthenticated ? <AuthLinks logout={logout} /> : <GuestLinks />}
              <div>
                <Switcher />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white  divide-gray-50 dark:bg-neutral-800 ">
            <div className="pt-5 pb-6 px-5 sm:pb-8 ">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://res.cloudinary.com/ddksrkond/image/upload/v1663683826/media/photo/2022/09/4667ec21-129a-4f83-8e08-9ed47cfd4176_r1nhmg.png"
                    alt=""
                  />
                </div>
                <div>
                  <Switcher />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 dark:bg-neutral-700">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <nav>
                  <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                    {solutions.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="-m-3 mr-2 flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-orange-500 text-white sm:h-12 sm:w-12 ">
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="ml-4 text-base font-medium text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 ">
              <div className="grid grid-cols-2 gap-4 ">
                <Link
                  to="/dashboard/payments"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400"
                >
                  Orders
                </Link>

                <Link
                  to="/dashboard"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Dashboard
                </Link>
              </div>
              <div className="mt-6">
                {!isAuthenticated && (
                  <>
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700"
                    >
                      Login
                    </Link>
                    <p className="mt-6 text-center text-base font-medium text-gray-500 dark:text-gray-400 dark:hover:text-gray-300">
                      Or create account{" "}
                      <Link
                        to="/signup"
                        className="text-orange-600 hover:text-orange-500"
                      >
                        Register
                      </Link>
                    </p>
                  </>
                )}
                {isAuthenticated && (
                  <Link
                    onClick={() => {
                      logout?.();
                      window.location.href = "/login";
                    }}
                    to="#"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700"
                  >
                    SignOut
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
const mapStateToProps = (state: ReducersStateType) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  categories: state.Categories.categories,
  total_items_cart: state.Cart.total_items,
  total_items_wishlist: state.Whishlist.total_items,
});

export default connect(mapStateToProps, {
  logout,
  get_categories,
  get_search_products,
  get_item_total,
  get_items,
  get_total,
  get_wishlist_items,
  get_wishlist_item_total,
})(Navbar);
