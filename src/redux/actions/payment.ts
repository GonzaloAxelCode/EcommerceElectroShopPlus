import axios from "axios";
import { AnyAction, Dispatch } from "redux";
import { ActionType } from "../../interfaces";
import { setAlert } from "./alert";
import { get_item_total } from "./cart";
import {
  GET_PAYMENT_TOTAL_SUCCESS,
  GET_PAYMENT_TOTAL_FAIL,
  LOAD_BT_TOKEN_SUCCESS,
  LOAD_BT_TOKEN_FAIL,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  RESET_PAYMENT_INFO,
  SET_PAYMENT_LOADING,
  REMOVE_PAYMENT_LOADING,
} from "./types";

export const get_payment_total =
  (shipping_id: number, coupon_name: string) =>
  async (dispatch: Dispatch<ActionType>) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/payment/get-payment-total?shipping_id=${shipping_id}&coupon_name=${coupon_name}`,
        config
      );

      if (res.status === 200 && !res.data.error) {
        dispatch({
          type: GET_PAYMENT_TOTAL_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_PAYMENT_TOTAL_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: GET_PAYMENT_TOTAL_FAIL,
      });
    }
  };
export const get_client_token =
  () => async (dispatch: Dispatch<ActionType>) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/payment/get-token`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: LOAD_BT_TOKEN_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: LOAD_BT_TOKEN_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: LOAD_BT_TOKEN_FAIL,
      });
    }
  };

export const process_payment =
  (
    nonce: any,
    shipping_id: any,
    coupon_name: any,
    full_name: any,
    address_line_1: any,
    address_line_2: any,
    city: any,
    state_province_region: any,
    postal_zip_code: any,
    country_region: any,
    telephone_number: any
  ) =>
  async (dispatch: any) => {
    dispatch({
      type: SET_PAYMENT_LOADING,
    });
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    const body = JSON.stringify({
      nonce,
      shipping_id,
      coupon_name,
      full_name,
      address_line_1,
      address_line_2,
      city,
      state_province_region,
      postal_zip_code,
      country_region,
      telephone_number,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/make-payment`,
        body,
        config
      );
      if (res.status === 200 && res.data.success) {
        dispatch(setAlert(res.data.success, "green"));
        dispatch({
          type: PAYMENT_SUCCESS,
        });
        dispatch(get_item_total());
      } else {
        dispatch(setAlert(res.data.error, "red"));
        dispatch({
          type: PAYMENT_FAIL,
        });
      }
    } catch (err: any) {
      dispatch(setAlert(err.response.data.error, "red"));
      dispatch({
        type: PAYMENT_FAIL,
      });
    }

    dispatch({
      type: REMOVE_PAYMENT_LOADING,
    });

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

export const reset = () => (dispatch: any) => {
  dispatch({
    type: RESET_PAYMENT_INFO,
  });
};
