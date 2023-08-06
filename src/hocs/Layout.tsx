import React, { FC, ReactNode, useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { connect } from "react-redux";
import { check_authenticated, load_user, refresh } from "../redux/actions/auth";
import Alert from "../components/Alert";
type Props = {
  children: JSX.Element | ReactNode;
  check_authenticated?: Function;
  load_user?: Function;
  refresh?: Function;
  isRedirect?: boolean;
};
const Layout: FC<Props> = ({
  children,
  check_authenticated,
  load_user,
  refresh,
  isRedirect,
}) => {
  useEffect(() => {
    if (check_authenticated && load_user && refresh) {
      check_authenticated();
      load_user();
      refresh();
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Alert />
      <div id="page-content-layout-div">{children}</div>
      <Footer />
    </div>
  );
};
export default connect(null, {
  check_authenticated,
  load_user,
  refresh,
})(Layout);
