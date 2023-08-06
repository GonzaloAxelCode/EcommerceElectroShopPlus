import React, { FC, useEffect, useState } from "react";
import Layout from "../../hocs/Layout";
import { connect } from "react-redux";
import { reset_password_confirm } from "../../redux/actions/auth";
import { ReducersStateType } from "../../redux/reducers";
import { Link, Navigate, useParams } from "react-router-dom";

type FormDataType = {
  re_password: string;
  password: string;
};

type SignupProps = {
  reset_password_confirm?: Function;
  loading?: boolean | null;
};

const ResetPasswordConfirm: FC<SignupProps> = ({
  reset_password_confirm,
  loading,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { uid, token } = useParams();
  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    re_password: "",
    password: "",
  });
  const { re_password, password } = formData;
  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: any) => {
    e.preventDefault();
    reset_password_confirm?.(uid, token, password, re_password);
    setIsResetPassword(true);
  };
  if (!loading && isResetPassword) {
    return <Navigate to="/login" />;
  }
  return (
    <Layout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 dark:bg-neutral-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://res.cloudinary.com/ddksrkond/image/upload/v1663117504/media/photo/2022/09/logo192_liuecr.png"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registrando nuevo password
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 dark:bg-neutral-900">
            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="re_password"
                  className="block text-sm font-medium text-gray-700"
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                {loading ? (
                  <button
                    type="submit"
                    className="relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span>
                      <div id="circle5"></div>
                    </span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span>Reset Password</span>
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
});

export default connect(mapStateToProps, {
  reset_password_confirm,
})(ResetPasswordConfirm);
