import { connect } from "react-redux";
import { get_items, get_total, get_item_total } from "../../redux/actions/cart";
import React, { useEffect, Fragment, useState, FC } from "react";
import { Navigate, Link } from "react-router-dom";
import { ReducersStateType } from "../../redux/reducers";
import { list_orders } from "../../redux/actions/order";
import LayoutDashboard from "../../hocs/LayoutDashboard";

interface Props {
  list_orders?: any | null;
  get_items?: any | null;
  get_total?: any | null;
  get_item_total?: any | null;
  orders?: any | null;
  isAuthenticated?: any | null;
  user?: any | null;
  check_authenticated?: any | null;
  load_user?: any | null;
  refresh?: any | null;
}
const Dashboard: FC<Props> = ({
  list_orders,
  get_items,
  get_total,
  get_item_total,
  orders,
  isAuthenticated,
  user,
}) => {
  if (!isAuthenticated && isAuthenticated !== null) {
    return <Navigate to="/" />;
  }
  return (
    <LayoutDashboard>
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <div className="max-w-3xl mx-auto">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Applicant Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal details and application.
                </p>
              </div>
              <div className="mt-5 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="flex-grow">
                        {user?.first_name} {user?.last_name}
                      </span>
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="flex-grow">{user?.email}</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutDashboard>
  );
};

const mapStateToProps = (state: ReducersStateType) => ({
  orders: state.Orders.orders,
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps, {})(Dashboard);
