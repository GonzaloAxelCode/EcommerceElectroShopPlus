import { ActionType } from "../../interfaces";
import {
  GET_SHIPPING_OPTIONS_SUCCESS,
  GET_SHIPPING_OPTIONS_FAIL,
} from "../actions/types";
export interface ShippingType {
  name: string;
  time_to_delivery: string;
  price: number;
  id?: number;
}

export interface StateTypesShipping {
  shipping: ShippingType[] | null;
}

const initialState: StateTypesShipping = {
  shipping: null,
};

export default function Shipping(
  state: StateTypesShipping = initialState,
  action: ActionType
) {
  const { type, payload } = action;
  switch (type) {
    case GET_SHIPPING_OPTIONS_SUCCESS:
      return {
        ...state,
        shipping: payload.shipping_options,
      };
    case GET_SHIPPING_OPTIONS_FAIL:
      return {
        ...state,
        shipping: null,
      };
    default:
      return {
        ...state,
      };
  }
}
