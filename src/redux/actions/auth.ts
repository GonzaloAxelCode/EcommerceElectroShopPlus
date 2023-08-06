import axios from "axios";
import {
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_FAIl,
  USER_LOADED_SUCCESS,
  AUTHENTICATED_FAIl,
  AUTHENTICATED_SUCCESS,
  REFRESH_FAIl,
  REFRESH_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIl,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  LOGOUT,
  GET_ITEMS_SUCCESS,
  GET_ITEM_TOTAL_FAIL,
  GET_ITEM_TOTAL_SUCCESS,
  GET_TOTAL_SUCCESS,
} from "./types";

import {
  AUTH_USERS_URL,
  ACTIVATE_USER_URL,
  USER_LOGIN_URL,
  GET_USER_URL,
  AUTH_VERIFY_URL,
  REFRESH_TOKEN_URL,
  RESET_PASSWORD_SEND_URL,
  RESET_PASSWORD_CONFIRM_URL,
  URL_BASE,
} from "./urlsApi";
import { setAlert } from "./alert";
import { Dispatch } from "redux";

import { ActionType } from "../../interfaces";
import { set_error } from "./errors";

export const check_authenticated =
  () => async (dispatch: Dispatch<ActionType | any>) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        token: localStorage.getItem("access"),
      });
      try {
        const res = await axios.post(
          `${URL_BASE}/${AUTH_VERIFY_URL}`,
          body,
          config
        );
        if (res.status === 200) {
          dispatch({
            type: AUTHENTICATED_SUCCESS,
          });
        } else {
          dispatch({
            type: AUTHENTICATED_FAIl,
          });
        }
      } catch (error) {
        dispatch({
          type: AUTHENTICATED_FAIl,
        });
      }
    } else {
      dispatch({
        type: AUTHENTICATED_FAIl,
      });
    }
  };

export const load_user = () => async (dispatch: Dispatch<ActionType | any>) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(`${URL_BASE}/${GET_USER_URL}`, config);
      if (res.status === 200) {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: USER_LOADED_FAIl });
      }
    } catch (error) {
      dispatch({ type: USER_LOADED_FAIl });
    }
  }
};

export const signup =
  (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    re_password: string
  ) =>
  async (dispatch: any) => {
    dispatch({ type: SET_AUTH_LOADING });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      re_password,
    });

    try {
      const res = await axios.post(
        `${URL_BASE}/${AUTH_USERS_URL}`,
        body,
        config
      );
      if (res.status === 201) {
        dispatch({ type: SIGNUP_SUCCESS });
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        dispatch(
          setAlert(
            "Te enviamos un correo, por favor activa tu cuenta. Revisa",
            "green"
          )
        );

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        dispatch({ type: SIGNUP_FAIL });
        dispatch(setAlert("Error al activar la cuenta", "red"));
        console.log(res);
      }

      dispatch({ type: REMOVE_AUTH_LOADING });
    } catch (err: any) {
      dispatch({ type: SIGNUP_FAIL });
      dispatch({ type: REMOVE_AUTH_LOADING });
      dispatch(
        set_error(
          err.response.data?.email,
          err.response.data?.password,
          err.response.data?.non_field_errors
        )
      );
      if (err.response.status === 500) {
        dispatch(setAlert("ALgo fallo 500", "red"));
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
      console.log(err);
    }
  };

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<ActionType | any>) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      email,
      password,
    });

    try {
      const res = await axios.post(
        `${URL_BASE}/${USER_LOGIN_URL}`,
        body,
        config
      );
      if (res.status === 200) {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        dispatch(load_user());
        dispatch(setAlert("Inicio de sesion con exito", "green"));
        localStorage.setItem("cart", JSON.stringify([]));
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        dispatch({ type: LOGIN_FAIL });
        console.log(res);
        dispatch(setAlert("Error al iniciar sesion datos incorrectos", "red"));
      }

      dispatch({ type: REMOVE_AUTH_LOADING });
    } catch (err: any) {
      dispatch({ type: LOGIN_FAIL });
      dispatch({ type: REMOVE_AUTH_LOADING });

      console.log(err);
      dispatch(setAlert(err.response.data.detail, "red"));
    }
  };

export const activate =
  (uid: string, token: string) =>
  async (dispatch: Dispatch<ActionType | any>) => {
    dispatch({ type: SET_AUTH_LOADING });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      uid,
      token,
    });

    try {
      const res = await axios.post(
        `${URL_BASE}/${ACTIVATE_USER_URL}`,
        body,
        config
      );
      if (res.status === 204) {
        dispatch({ type: ACTIVATION_SUCCESS });

        dispatch(setAlert("Cuenta activada correctamente", "green"));
      } else {
        dispatch({ type: ACTIVATION_FAIL });

        dispatch(setAlert("Error al activar la cuenta", "red"));
      }

      dispatch({ type: REMOVE_AUTH_LOADING });
    } catch (err: any) {
      dispatch({ type: ACTIVATION_FAIL });
      dispatch({ type: REMOVE_AUTH_LOADING });
      dispatch(setAlert("Error conectando con el servidor", "red"));
    }
  };

export const refresh = () => async (dispatch: Dispatch<ActionType | any>) => {
  if (localStorage.getItem("refresh")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      refresh: localStorage.getItem("refresh"),
    });
    try {
      const res = await axios.post(
        `${URL_BASE}/${REFRESH_TOKEN_URL}`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: REFRESH_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: REFRESH_FAIl,
      });
    }
  } else {
    dispatch({
      type: REFRESH_FAIl,
    });
  }
};

export const reset_password_confirm =
  (uid: string, token: string, new_password: string, re_new_password: string) =>
  async (dispatch: Dispatch<ActionType | any>) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      uid,
      token,
      new_password,
      re_new_password,
    });
    if (re_new_password === new_password) {
      try {
        const res = await axios.post(
          `${URL_BASE}/${RESET_PASSWORD_CONFIRM_URL}`,
          body,
          config
        );

        if (res.status === 204) {
          dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS,
          });
          dispatch({ type: REMOVE_AUTH_LOADING });

          dispatch(setAlert("Password cambiado correcramente", "green"));
        } else {
          dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIl,
          });

          dispatch({ type: REMOVE_AUTH_LOADING });
          dispatch(setAlert("Hubo un error al cambiar la contraseña", "red"));
        }
      } catch (error) {
        dispatch({
          type: RESET_PASSWORD_CONFIRM_FAIl,
        });
        dispatch({ type: REMOVE_AUTH_LOADING });
        dispatch(setAlert("Error conectando con el servidor ", "red"));
      }
    } else {
      dispatch(setAlert("Las contraseñas no son iguales ", "red"));
    }
  };

export const logout = () => async (dispatch: Dispatch<ActionType | any>) => {
  localStorage.setItem("cart", JSON.stringify([]));
  dispatch({
    type: LOGOUT,
  });
  dispatch(setAlert("Session terminada con exito", "green"));
  setTimeout(() => {
    window.location.href = "/login";
  }, 1000);
};

export const reset_password =
  (email: string) => async (dispatch: Dispatch<ActionType | any>) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email });
    try {
      const res = await axios.post(
        `${URL_BASE}/${RESET_PASSWORD_SEND_URL}`,
        body,
        config
      );
      if (res.status == 204) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
        dispatch({
          type: REMOVE_AUTH_LOADING,
        });
        dispatch(setAlert("Password reset email send", "green"));
      } else {
        dispatch({
          type: RESET_PASSWORD_FAIL,
        });
        dispatch({
          type: REMOVE_AUTH_LOADING,
        });
        dispatch(setAlert("Error sending password reset email", "green"));
      }
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });

      dispatch(setAlert("Error conectando con el servidor", "green"));
    }
  };
