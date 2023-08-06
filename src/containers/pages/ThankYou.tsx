import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Layout from "../../hocs/Layout";
import { reset } from "../../redux/actions/payment";
import { ReducersStateType } from "../../redux/reducers";

interface Props {
  isAuthenticated?: boolean;
}
const ThankYou: FC<Props> = ({ isAuthenticated }) => {
  useEffect(() => {
    reset();
  }, []);
  if (!isAuthenticated && isAuthenticated !== null) {
    return <Navigate to="/" />;
  }
  return (
    <Layout>
      <div className="bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl dark:text-white">
              Thank You
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 mb-12">
              Hope you enjoyed shopping in my ecommerce
            </p>
            <Link
              to="/dashboard/payments"
              className="w-full bg-gray-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
            >
              Ver Ordenes
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: ReducersStateType) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  reset,
})(ThankYou);
