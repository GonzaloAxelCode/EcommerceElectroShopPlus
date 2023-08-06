import { ActionType } from "../../interfaces";
import { GET_COUPON_SUCCESS, GET_COUPON_FAIL } from "../actions/types";
export interface StateTypesCoupons {
  coupon: any;
}
const initialState: StateTypesCoupons = {
  coupon: null,
};

export default function Coupons(
  state: StateTypesCoupons = initialState,
  action: ActionType
) {
  const { type, payload } = action;

  switch (type) {
    case GET_COUPON_SUCCESS:
      return {
        ...state,
        coupon: payload.coupon,
      };
    case GET_COUPON_FAIL:
      return {
        ...state,
        coupon: null,
      };
    default:
      return state;
  }
}
