import React, { FC, useEffect, useState } from "react";
import Layout from "../../hocs/Layout";
import { connect } from "react-redux";
import { signup } from "../../redux/actions/auth";
import { ReducersStateType } from "../../redux/reducers";

import { Link, Navigate } from "react-router-dom";
import { load_error } from "../../redux/actions/errors";
type FormDataType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  re_password: string;
};

type SignupProps = {
  signup?: Function;
  loading?: boolean;
  email_errors?: string[];
  passwords_errors?: string[];
  load_error?: Function;
  non_field_errors?: string[];
};

const Signup: FC<SignupProps> = ({
  signup,
  loading,
  email_errors,
  passwords_errors,
  load_error,
  non_field_errors,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [accountCreated, setAccountCreated] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { first_name, last_name, email, password, re_password } = formData;
  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: any) => {
    e.preventDefault();
    signup?.(first_name, last_name, email, password, re_password);
    setAccountCreated(true);
  };

  if (!loading && accountCreated) {
    //return <Navigate to="/login" />;
  }
  return (
    <Layout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 dark:bg-neutral-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://res.cloudinary.com/ddksrkond/image/upload/v1663683826/media/photo/2022/09/4667ec21-129a-4f83-8e08-9ed47cfd4176_r1nhmg.png"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-400">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 dark:bg-neutral-900">
            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    value={email}
                    onChange={(e) => onChange(e)}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-neutral-900 dark:text-gray-400 dark:border-slate-700"
                  />
                </div>
              </div>
              <div className="email-errors m-0">
                {email_errors?.length === 0 ? (
                  <></>
                ) : (
                  email_errors?.map((err, index) => {
                    return (
                      <p
                        className="text-red-400 m-1 text-sm bold italic"
                        key={index}
                      >
                        <b>{err}</b>
                      </p>
                    );
                  })
                )}
              </div>
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    value={first_name}
                    onChange={(e) => onChange(e)}
                    name="first_name"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-neutral-900 dark:text-gray-400 dark:border-slate-700"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    value={last_name}
                    onChange={(e) => onChange(e)}
                    name="last_name"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-neutral-900 dark:text-gray-400 dark:border-slate-700"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    value={password}
                    onChange={(e) => onChange(e)}
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-neutral-900 dark:text-gray-400 dark:border-slate-700"
                  />
                </div>

                <div className="password-errors ">
                  {passwords_errors?.length === 0 ? (
                    <></>
                  ) : (
                    passwords_errors?.map((err, index) => {
                      return (
                        <p
                          className="text-red-400 m-1 text-sm bold italic"
                          key={index}
                        >
                          <b>{err}</b>
                        </p>
                      );
                    })
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="re_password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Repeat Password
                </label>
                <div className="mt-1">
                  <input
                    value={re_password}
                    onChange={(e) => onChange(e)}
                    name="re_password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-neutral-900 dark:text-gray-400 dark:border-slate-700"
                  />
                </div>
                <div className="password-errors ">
                  {non_field_errors?.length === 0 ? (
                    <></>
                  ) : (
                    non_field_errors?.map((err, index) => {
                      return (
                        <p
                          className="text-red-400 m-1 text-sm bold italic"
                          key={index}
                        >
                          <b>{err}</b>
                        </p>
                      );
                    })
                  )}
                </div>
              </div>

              <div>
                {loading ? (
                  <button
                    type="submit"
                    className="relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    <span>
                      <div id="circle5"></div>
                    </span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    <span>Register</span>
                  </button>
                )}
              </div>
            </form>

            <div className="mt-6"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: ReducersStateType) => ({
  loading: state.Auth.loading,
  email_errors: state.Errors.email_errors,
  passwords_errors: state.Errors.passwords_errors,
  non_field_errors: state.Errors.non_field_errors,
});

export default connect(mapStateToProps, {
  signup,
  load_error,
})(Signup);
