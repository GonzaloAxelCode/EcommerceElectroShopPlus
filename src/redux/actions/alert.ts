import { Dispatch } from "redux";
import { ActionType } from "../../interfaces";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert =
  (mensaje: string, color: string, timeout = 4000) =>
  (dispatch: Dispatch<ActionType>) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        message: mensaje,
        color: color,
      },
    });

    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
        }),
      timeout
    );
  };
export const cancel_alert = () => (dispatch: Dispatch<ActionType>) => {
  dispatch({ type: REMOVE_ALERT });
};
