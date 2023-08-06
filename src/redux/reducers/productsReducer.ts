import { ActionType } from "../../interfaces";
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
} from "../actions/types";

export interface ProductType {
  id: number;
  name: string;
  photo: string;
  description: string;
  price: string;
  compare_price: string;
  quantity: number;
  sold: number;
  date_created: string;
  category: number;
  get_thumbnail?: string;
}
export interface StateTypesProducts {
  products: ProductType[] | null;
  products_arrival: ProductType[] | null;
  products_sold: ProductType[] | null;
  product: ProductType[] | null;
  search_products: ProductType[] | null;
  related_products: ProductType[] | null;
  filtered_products: ProductType[] | null;
  cadena: string | null;
}

const initialState: StateTypesProducts = {
  products: null,
  products_arrival: null,
  products_sold: null,
  product: null,
  search_products: [],
  related_products: null,
  filtered_products: null,

  cadena: null,
};

export default function Cart(
  state: StateTypesProducts = initialState,
  action: ActionType
): StateTypesProducts {
  const type = action.type;
  const payload: StateTypesProducts = action.payload;

  switch (type) {
    case "SEND_ARDUINO_FAIL":
      return {
        ...state,
        cadena: null,
      };
    case "SEND_ARDUINO_SUCCESS":
      return {
        ...state,
        cadena: payload.cadena,
      };
    case "SERIAL_RESET_SUCCESS":
    case "SERIAL_RESET_FAIL":
      return {
        ...state,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.products,
      };
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        products: null,
      };
    case GET_PRODUCTS_BY_ARRIVAL_SUCCESS:
      return {
        ...state,
        products_arrival: payload.products,
      };
    case GET_PRODUCTS_BY_ARRIVAL_FAIL:
      return {
        ...state,
        products_arrival: null,
      };
    case GET_PRODUCTS_BY_SOLD_SUCCESS:
      return {
        ...state,
        products_sold: payload.products,
      };
    case GET_PRODUCTS_BY_SOLD_FAIL:
      return {
        ...state,
        products_sold: null,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: payload.product,
      };
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        product: null,
      };
    case RELATED_PRODUCTS_SUCCESS:
      return {
        ...state,
        related_products: payload.related_products,
      };
    case RELATED_PRODUCTS_FAIL:
      return {
        ...state,
        related_products: null,
      };
    case FILTER_PRODUCTS_SUCCESS:
      return {
        ...state,
        filtered_products: payload.filtered_products,
      };
    case FILTER_PRODUCTS_FAIL:
      return {
        ...state,
        filtered_products: null,
      };
    case SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        search_products: payload.search_products,
      };
    case SEARCH_PRODUCTS_FAIL:
      return {
        ...state,
        search_products: [],
      };
    default:
      return { ...state };
  }
}
