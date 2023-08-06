import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { FC } from "react";

import { ReducersStateType } from "./redux/reducers";

interface Props {
  children: JSX.Element;
  isAuthenticated?: boolean;
}
const PrivateRoute: FC<Props> = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/" />;
  }

  // authorized so return child components
  return children;
};
const mapStateToProps = (state: ReducersStateType) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});
export default connect(mapStateToProps, null)(PrivateRoute);
