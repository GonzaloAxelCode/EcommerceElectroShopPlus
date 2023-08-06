import axios from "axios";

import { Dispatch } from "redux";
import { ActionType } from "../../interfaces";
import qs from "qs";
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
  GET_PRODUCTS_BY_ARRIVAL_FAIL,
  GET_PRODUCTS_BY_SOLD_SUCCESS,
  GET_PRODUCTS_BY_SOLD_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAIL,
  RELATED_PRODUCTS_SUCCESS,
  RELATED_PRODUCTS_FAIL,
  FILTER_PRODUCTS_SUCCESS,
  FILTER_PRODUCTS_FAIL,
} from "./types";
import {
  URL_BASE,
  GET_PRODUCTS_URL,
  FILTER_PRODUCTS_URL,
  SEARCH_PRODUCTS_URL,
  PRODUCT_DETAIL_URL,
  RELATED_PRODUCTS_URL,
} from "./urlsApi";
export const sendDataToArduino =
  (cadena: string) => async (dispatch: Dispatch<ActionType>) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      cadena: cadena,
    });
    try {
      const res = await axios.post(
        `${URL_BASE}/api/product/arduino`,
        body,
        config
      );
      if (res.status === 200 && !res.data.error) {
        dispatch({
          type: "SEND_ARDUINO_SUCCESS",
          payload: {
            cadena,
          },
        });
      } else {
        dispatch({
          type: "SEND_ARDUINO_FAIL",
        });
      }
    } catch (error) {
      dispatch({
        type: "SEND_ARDUINO_FAIL",
      });
    }
  };

export const reset_serial = () => async (dispatch: Dispatch<ActionType>) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const res = await axios.get(`${URL_BASE}/api/product/reset-serial`, config);
    if (res.status === 200) {
      dispatch({
        type: "SERIAL_RESET_SUCCESS",
      });
    } else {
      dispatch({
        type: "SERIAL_RESET_FAIL",
      });
    }
  } catch (error) {
    dispatch({
      type: "SERIAL_RESET_FAIL",
    });
  }
};

export const get_products = () => async (dispatch: Dispatch<ActionType>) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const res = await axios.get(`${URL_BASE}/${GET_PRODUCTS_URL}`, config);
    if (res.status === 200) {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_PRODUCTS_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
    });
  }
};

export const get_products_by_arrival =
  () => async (dispatch: Dispatch<ActionType>) => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${URL_BASE}/api/product/get_products?sortBy=date_created&order=desc&limit=3`,
        config
      );
      if (res.status === 200) {
        dispatch({
          type: GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_PRODUCTS_BY_ARRIVAL_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_BY_ARRIVAL_FAIL,
      });
    }
  };

export const get_products_by_sold =
  () => async (dispatch: Dispatch<ActionType>) => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${URL_BASE}/api/product/get_products?sortBy=sold&order=desc&limit=3`,
        config
      );
      if (res.status === 200) {
        dispatch({
          type: GET_PRODUCTS_BY_SOLD_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_PRODUCTS_BY_SOLD_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_BY_SOLD_FAIL,
      });
    }
  };

export const get_product =
  (productId: string) => async (dispatch: Dispatch<ActionType>) => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${URL_BASE}/${PRODUCT_DETAIL_URL}/${String(productId)}`,
        config
      );
      if (res.status === 200) {
        dispatch({
          type: GET_PRODUCT_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_PRODUCT_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_PRODUCT_FAIL,
      });
    }
  };

export const get_related_products =
  (productId: string) => async (dispatch: Dispatch<ActionType>) => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${URL_BASE}/${RELATED_PRODUCTS_URL}/${String(productId)}`,
        config
      );
      if (res.status === 200 && !res.data.error) {
        dispatch({
          type: RELATED_PRODUCTS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: RELATED_PRODUCTS_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: RELATED_PRODUCTS_FAIL,
      });
    }
  };

export const get_filter_products =
  (category_id: string, price_range: string, sort_by: string, order: string) =>
  async (dispatch: Dispatch<ActionType>) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      category_id,
      price_range,
      sort_by,
      order,
    });
    try {
      const res = await axios.post(
        `${URL_BASE}/${FILTER_PRODUCTS_URL}`,
        body,
        config
      );
      if (res.status === 200 && !res.data.empty) {
        dispatch({
          type: FILTER_PRODUCTS_SUCCESS,
          payload: res.data,
        });
      } else {
        alert("no encontrado");
        dispatch({
          type: FILTER_PRODUCTS_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: FILTER_PRODUCTS_FAIL,
      });
    }
  };

export const get_search_products =
  (search: string, category_id: string) =>
  async (dispatch: Dispatch<ActionType>) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      category_id,
      search,
    });
    try {
      const res = await axios.post(
        `${URL_BASE}/${SEARCH_PRODUCTS_URL}`,
        body,
        config
      );
      if (res.status === 200 && !res.data.error) {
        dispatch({
          type: SEARCH_PRODUCTS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: SEARCH_PRODUCTS_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: SEARCH_PRODUCTS_FAIL,
      });
    }
  };
