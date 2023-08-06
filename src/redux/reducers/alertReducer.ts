import { REMOVE_ALERT, SET_ALERT } from "../actions/types";
import { ActionType } from "../../interfaces/index";

export interface AlertType {
  type: string;
  mensaje: string;
}

export interface StateTypeAlert {
  showAlert: boolean;
  message: string;
  color: string;
}

const initialState: StateTypeAlert = {
  showAlert: false,
  message: "",
  color: "",
};

export default function Alert(
  state: StateTypeAlert = initialState,
  action: ActionType
): StateTypeAlert {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        showAlert: true,
        message: payload.message,
        color: payload.color,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        showAlert: false,
        message: "",
        color: "",
      };
    default:
      return state;
  }
}
