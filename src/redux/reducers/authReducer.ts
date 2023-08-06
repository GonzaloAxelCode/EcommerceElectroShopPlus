import {
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  REMOVE_AUTH_LOADING,
  SET_AUTH_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED_FAIl,
  USER_LOADED_SUCCESS,
  REFRESH_FAIl,
  REFRESH_SUCCESS,
  AUTHENTICATED_FAIl,
  AUTHENTICATED_SUCCESS,
  LOGOUT,
  RESET_PASSWORD_CONFIRM_FAIl,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
} from "../actions/types";
import { ActionType } from "../../interfaces";

export interface StateTypesAuth {
  access: any;
  refresh: any;
  isAuthenticated: Boolean | any;
  user: any;
  loading: boolean;
}

const initialState: StateTypesAuth = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
  loading: false,
};

export default function Auth(
  state: StateTypesAuth = initialState,
  action: ActionType
): StateTypesAuth {
  const { type, payload } = action;

  switch (type) {
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case USER_LOADED_FAIl: {
      return {
        ...state,
        user: null,
      };
    }
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AUTHENTICATED_FAIl:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: localStorage.getItem("access"),
        refresh: localStorage.getItem("refresh"),
      };
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
    case RESET_PASSWORD_CONFIRM_FAIl:
    case RESET_PASSWORD_CONFIRM_SUCCESS:
    case RESET_PASSWORD_FAIL:
    case RESET_PASSWORD_SUCCESS:
      return { ...state };
    case REFRESH_SUCCESS:
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        access: localStorage.getItem("access"),
      };
    case SIGNUP_SUCCESS:
    case SIGNUP_FAIL:
    case REFRESH_FAIl:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
