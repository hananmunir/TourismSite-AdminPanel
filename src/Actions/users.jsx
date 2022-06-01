import { FETCH_ALL_USERS } from "../Constants/actionTypes.js";
import * as API from "../api";

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await API.fetchUsers();
    dispatch({ type: FETCH_ALL_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
