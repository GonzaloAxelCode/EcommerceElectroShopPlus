import { Dispatch } from "redux";
import { ActionType } from "../../interfaces";
import { LOAD_ERROR, SET_ERROR } from "./types";

export const set_error =
  (
    email_errors: any[] = [],
    passwords_errors: any[] = [],
    non_field_errors: any[] = []
  ) =>
  async (dispatch: Dispatch<ActionType>) => {
    dispatch({
      type: SET_ERROR,
      payload: {
        email_errors,
        passwords_errors,
        non_field_errors,
      },
    });
  };

export const load_error = () => async (dispatch: Dispatch<ActionType>) => {
  dispatch({
    type: LOAD_ERROR,
  });
};
