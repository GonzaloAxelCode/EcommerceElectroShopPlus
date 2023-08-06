import React, { FC, useEffect, useState } from "react";
import Layout from "../../hocs/Layout";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import { ReducersStateType } from "../../redux/reducers";
import { Link, Navigate } from "react-router-dom";

type FormDataType = {
  email: string;
  password: string;
};

type SignupProps = {
  login?: Function;
  loading?: boolean | null;
  isAuthenticated?: boolean | null;
};

const Login: FC<SignupProps> = ({ login, loading, isAuthenticated }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
  });
  const [logged, setLogged] = useState<boolean>(false);
  const { email, password } = formData;
  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: any) => {
    e.preventDefault();
    login?.(email, password);
  };

  //if (logged && !loading && isAuthenticated) return <Navigate to="/" />;
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
            Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Register
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 dark:bg-neutral-900">
            <button className="mb-5 relative w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <span className="mr-2">Metamask Ethereum</span>
              <span>
                <img
                  className="w-8 h-8"
                  src="https://cdn.iconscout.com/icon/free/png-256/ethereum-3628756-3029981.png"
                  alt="ethe-logo"
                />
              </span>
              <span>(no disponible)</span>
            </button>
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
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/reset_password"
                    className="font-medium text-orange-500 hover:text-orange-400"
                  >
                    Olvido su contraseña?
                  </Link>
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
                    <span>Login</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: ReducersStateType) => ({
  loading: state.Auth.loading,
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  login,
})(Login);
