import React, { FC, Fragment } from "react";

import { Menu, Popover, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
interface Props {
  logout?: Function;
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const AuthLinks: FC<Props> = ({ logout }) => {
  const logoutHandler = () => {
    logout?.();
  };
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className=" inline-flex justify-center w-full rounded-full  text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-orange-500">
          <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100 dark:bg-neutral-700">
            <img
              src="https://static.vecteezy.com/system/resources/previews/002/567/996/non_2x/3d-figure-designer-flat-style-icon-free-vector.jpg"
              alt="User-Profile"
            />
          </span>
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-800">
          <div className="py-1">
            <Menu.Item>
              {(props: any) => (
                <Link
                  to="/dashboard"
                  className={classNames(
                    props.active
                      ? "bg-gray-100 text-gray-800 dark:bg-neutral-900 dark:text-gray-400"
                      : "text-gray-700 dark:text-gray-400",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Dashboard
                </Link>
              )}
            </Menu.Item>

            <form>
              <Menu.Item>
                {(props: any) => (
                  <button
                    onClick={logoutHandler}
                    className={classNames(
                      props.active
                        ? "bg-gray-100 text-gray-800 dark:bg-neutral-900 dark:text-gray-400"
                        : "text-gray-700 dark:text-gray-400",
                      "block w-full text-left px-4 py-2 text-sm "
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AuthLinks;
