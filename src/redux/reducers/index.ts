import { combineReducers } from "redux";

import Alert, { StateTypeAlert } from "./alertReducer";
import Auth, { StateTypesAuth } from "./authReducer";
import Categories, { StateTypesCategories } from "./categoriesReducer";
import Products, { StateTypesProducts } from "./productsReducer";
import Cart, { StateTypesCartItems } from "./cartReducer";
import Shipping, { StateTypesShipping } from "./reducerShipping";
import Payment, { StateTypesPayment } from "./reducerPayment";
import Orders, { StateTypesOrders } from "./reducerOrders";
import Coupons, { StateTypesCoupons } from "./reducerCoupon";
import Errors, { StateTypesErrors } from "./errorsReducers";
import Reviews, { StateTypesReviews } from "./reviewsReducer";
import Whishlist, { StateTypesWhislist } from "./wishlistReducer";
import Profile, { StateTypesProfile } from "./profileReducer";
export interface ReducersStateType {
  Auth: StateTypesAuth;
  Alert: StateTypeAlert;
  Categories: StateTypesCategories;
  Products: StateTypesProducts;
  Cart: StateTypesCartItems;
  Shipping: StateTypesShipping;
  Payment: StateTypesPayment;
  Orders: StateTypesOrders;
  Coupons: StateTypesCoupons;
  Errors: StateTypesErrors;
  Reviews: StateTypesReviews;
  Whishlist: StateTypesWhislist;
  Profile: StateTypesProfile;
}

export default combineReducers<ReducersStateType>({
  Auth,
  Payment,
  Categories,
  Alert,
  Products,
  Cart,
  Shipping,
  Orders,
  Coupons,
  Errors,
  Reviews,
  Whishlist,
  Profile,
});
