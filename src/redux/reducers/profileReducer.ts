import { ActionType } from "../../interfaces";
import {
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
} from "../actions/types";

export interface ProfileType {
  id?: any;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state_province_region: string;
  zipcode: string;
  phone: string;
  country_region: string;
}
export interface StateTypesProfile {
  profile: ProfileType | null;
}

const initialState = {
  profile: null,
};

export default function Profile(
  state: StateTypesProfile = initialState,
  action: ActionType
) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload.profile,
      };
    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload.profile,
      };
    case UPDATE_USER_PROFILE_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
