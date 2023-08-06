import { ActionType } from "../../interfaces";
import { LOAD_ERROR, SET_ERROR } from "../actions/types";
export interface StateTypesErrors {
  email_errors: string[];
  passwords_errors: string[];
  non_field_errors: string[];
}

const initialState: StateTypesErrors = {
  email_errors: [],
  passwords_errors: [],
  non_field_errors: [],
};

export default function Errors(
  state: StateTypesErrors = initialState,
  action: ActionType
) {
  const { type, payload } = action;
  switch (type) {
    case SET_ERROR:
      return {
        ...state,
        email_errors: payload.email_errors,
        passwords_errors: payload.passwords_errors,
        non_field_errors: payload.non_field_errors,
      };
    case LOAD_ERROR:
      return {
        ...state,
        email_errors: payload.email_errors,
        passwords_errors: payload.passwords_errors,
        non_field_errors: payload.non_field_errors,
      };
    default:
      return {
        ...state,
      };
  }
}
