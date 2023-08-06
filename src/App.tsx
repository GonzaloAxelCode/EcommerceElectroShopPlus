import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Error404 from "./containers/errors/Error404";
import Activate from "./containers/Auth/Activate";
import Login from "./containers/Auth/Login";
import Signup from "./containers/Auth/Signup";
import ResetPassword from "./containers/Auth/ResetPassword";
import ResetPasswordConfirm from "./containers/Auth/ResetPasswordConfirm";
import Shop from "./containers/Shop";
import ProductDetail from "./containers/pages/productDetail";
import Searchpage from "./containers/pages/Searchpage";
import ArduinoPage from "./containers/pages/ArduinoPage";
import CartPage from "./containers/pages/CartPage";
import Checkout from "./containers/pages/Checkout";
import PrivateRoute from "./PrivateRoute";
import ThankYou from "./containers/pages/ThankYou";
import Dashboard from "./containers/pages/Dashboard";
import DashboardPayments from "./containers/pages/DashboardPayments";
import DashboardPaymentsDetail from "./containers/pages/DashboardPaymentsDetail";
import WhislistPage from "./containers/pages/WhislistPage";
import DashboardProfile from "./containers/pages/DashboardProfile";
const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/dashboard/payments" element={<DashboardPayments />} />

        <Route
          path="/dashboard/payment/:transaction_id"
          element={<DashboardPaymentsDetail />}
        />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activate/:uid/:token" element={<Activate />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<ResetPasswordConfirm />}
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/search" element={<Searchpage />} />

        {/* remove */}
        <Route path="/arduino" element={<ArduinoPage />} />
        <Route path="/wishlist" element={<WhislistPage />} />

        <Route path="/dashboard/profile" element={<DashboardProfile />} />
      </Routes>
    </Provider>
  );
};

export default App;
