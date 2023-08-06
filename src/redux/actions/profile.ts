import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
} from "./types";

export const get_user_profile = () => async (dispatch: any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/profile/user`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: GET_USER_PROFILE_SUCCESS,
          payload: res.data,
        });
        console.log(res.data);
      } else {
        dispatch({
          type: GET_USER_PROFILE_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: GET_USER_PROFILE_FAIL,
      });
    }
  }
};

export const update_user_profile =
  (
    address_line_1: string,
    address_line_2: string,
    city: string,
    state_province_region: string,
    zipcode: string,
    phone: string,
    country_region: string
  ) =>
  async (dispatch: any) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      const body = JSON.stringify({
        address_line_1,
        address_line_2,
        city,
        state_province_region,
        zipcode,
        phone,
        country_region,
      });

      try {
        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/profile/update`,
          body,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: UPDATE_USER_PROFILE_SUCCESS,
            payload: res.data,
          });
          dispatch(setAlert("Profile updated successfully", "green"));
        } else {
          dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
          });
          dispatch(setAlert("Failed to update profile", "red"));
        }
      } catch (err) {
        dispatch({
          type: UPDATE_USER_PROFILE_FAIL,
        });
        dispatch(setAlert("Failed to update profile", "red"));
      }
    }
  };
