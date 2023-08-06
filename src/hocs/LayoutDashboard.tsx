import React, { FC, Fragment, ReactNode, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dialog, Menu, Popover, Transition } from "@headlessui/react";
import {
  BellIcon,
  CalendarIcon,
  MenuAlt2Icon,
  MenuIcon,
  ShoppingCartIcon,
  XIcon,
} from "@heroicons/react/outline";
import { CreditCardIcon, SearchIcon, UserIcon } from "@heroicons/react/solid";
import {
  check_authenticated,
  load_user,
  logout,
  refresh,
} from "../redux/actions/auth";
import Alert from "../components/Alert";
import { Link, Navigate } from "react-router-dom";
import { get_items, get_item_total, get_total } from "../redux/actions/cart";
import { list_orders } from "../redux/actions/order";
import { get_categories } from "../redux/actions/caegories";
import { ReducersStateType } from "../redux/reducers";
import { solutions } from "../components/navigation/Navbar";
import { get_user_profile } from "../redux/actions/profile";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  children: JSX.Element | ReactNode;
  check_authenticated?: Function;
  load_user?: Function;
  refresh?: Function;
  list_orders?: any | null;
  get_items?: any | null;
  get_total?: any | null;
  get_item_total?: any | null;
  logout?: Function;
  get_categories?: Function;
  isAuthenticated?: boolean | null;
  get_user_profile?: Function;
};
const LayoutDashboard: FC<Props> = ({
  children,
  check_authenticated,
  load_user,
  refresh,
  list_orders,
  get_items,
  get_total,
  get_item_total,
  logout,
  get_categories,
  isAuthenticated,
  get_user_profile,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    if (check_authenticated && load_user && refresh) {
      check_authenticated();
      load_user();
      refresh();
    }

    list_orders?.();
    //get_user_profile?.();
  }, []);

  if (!isAuthenticated && isAuthenticated !== null) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Popover className="relative bg-white">
        <Alert />

        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-40 md:hidden"
              onClose={setSidebarOpen}
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
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 flex items-center px-4">
                    <Link to="/">
                      <img
                        className="h-8 w-auto cursor-pointer"
                        src="https://res.cloudinary.com/ddksrkond/image/upload/v1663117504/media/photo/2022/09/logo192_liuecr.png"
                        alt="Workflow"
                      />
                    </Link>
                  </div>
                  <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    <nav className="px-2 space-y-1">
                      <DashboardLink />
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-8 w-auto"
                  src="https://res.cloudinary.com/ddksrkond/image/upload/v1663117504/media/photo/2022/09/logo192_liuecr.png"
                  alt="Workflow"
                />
              </div>
              <div className="mt-5 flex-grow flex flex-col">
                <nav className="flex-1 px-2 pb-4 space-y-1">
                  <DashboardLink />
                </nav>
              </div>
            </div>
          </div>
          <div className="md:pl-64 flex flex-col flex-1">
            <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
              <button
                type="button"
                className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 px-4 flex justify-between">
                <div className="flex-1 flex">
                  <form className="w-full flex md:ml-0" action="#" method="GET">
                    <label htmlFor="search-field" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <input
                        id="search-field"
                        className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                        placeholder="Search"
                        type="search"
                        name="search"
                      />
                    </div>
                  </form>
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>

                        <svg
                          className="h-8 w-8 text-gray-300 rounded-full"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg>
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
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="#"
                              onClick={() => {
                                logout?.();
                              }}
                              className={classNames(
                                active ? "bg-gray-100 cursor-pointer" : "",
                                "block px-4 py-2 text-sm cursor-pointer text-gray-700"
                              )}
                            >
                              Log Out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <div className="-mr-2 -my-2 md:hidden flex items-center">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
            </div>
            {/* */}

            <div id="page-content-layout-dashboard-div">{children}</div>
            {/* */}
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
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5 sm:pb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://res.cloudinary.com/ddksrkond/image/upload/v1663117504/media/photo/2022/09/logo192_liuecr.png"
                      alt="Workflow"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
                          className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-8 text-base"></div>
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5">
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="#"
                    className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Orders
                  </Link>

                  <Link
                    to="#"
                    className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Dashboard
                  </Link>
                </div>
                <div className="mt-6">
                  {!isAuthenticated && (
                    <>
                      <Link
                        to="/login"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Login
                      </Link>
                      <p className="mt-6 text-center text-base font-medium text-gray-500">
                        Or create account{" "}
                        <Link
                          to="/signup"
                          className="text-indigo-600 hover:text-indigo-500"
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
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
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
    </div>
  );
};

function DashboardLink() {
  return (
    <>
      <Link
        to="/dashboard"
        className={classNames(
          "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
        )}
      >
        <CalendarIcon
          className={classNames(
            "mr-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
          )}
          aria-hidden="true"
        />
        Dashboard
      </Link>
      <Link
        to="/dashboard/payments"
        className={classNames(
          "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
        )}
      >
        <CreditCardIcon
          className={classNames(
            "mr-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
          )}
          aria-hidden="true"
        />
        Payment History
      </Link>
      <Link
        to="/dashboard/profile"
        className={classNames(
          "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
        )}
      >
        <UserIcon
          className={classNames(
            "mr-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
          )}
          aria-hidden="true"
        />
        Profile
      </Link>{" "}
      <Link
        to="/shop"
        className={classNames(
          "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
        )}
      >
        <ShoppingCartIcon
          className={classNames(
            "mr-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
          )}
          aria-hidden="true"
        />
        Shop
      </Link>
    </>
  );
}
const mapStateToProps = (state: ReducersStateType) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  check_authenticated,
  load_user,
  refresh,
  list_orders,
  get_items,
  get_total,
  get_item_total,
  logout,
  get_categories,
  get_user_profile,
})(LayoutDashboard);
