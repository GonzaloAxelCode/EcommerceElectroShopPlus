import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../../interfaces";
import { GET_CATEGORIES_FAIL, GET_CATEGORIES_SUCCESS } from "./types";
import { URL_BASE } from "./urlsApi";
export const get_categories = () => async (dispatch: Dispatch<ActionType>) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const res = await axios.get(`${URL_BASE}/api/category/categories`, config);
    if (res.status == 200) {
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_CATEGORIES_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_FAIL,
    });
  }
};
