import { SIGNIN, ERROR, LOGOUT } from "../Constants/actionTypes";
import * as api from "../api/index";

export const signIn = (email, password) => async (dispatch) => {
  try {
    const { data } = await api.signIn(email, password);

    dispatch({ type: SIGNIN, payload: data });
  } catch (error) {
    console.log(error);
    if (
      error.response.status === 401 ||
      error.response.status === 403 ||
      error.response.status === 404
    ) {
      dispatch({ type: ERROR, payload: "Email or Password Incorrect" });
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    console.log("Logging Out");
    dispatch({ type: LOGOUT, payload: [] });
  } catch (error) {
    console.log(error);
  }
};
