import { FETCH_ALL, CREATE, DELETE, UPDATE } from "../Constants/actionTypes.js";
import * as API from "../api";

export const getPackages = () => async (dispatch) => {
  try {
    const { data } = await API.fetchPackages();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPackage = (formdata) => async (dispatch) => {
  try {
    const { data } = await API.createPackage(formdata);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updatePackage = (id, formdata) => async (dispatch) => {
  try {
    const { data } = await API.updatePackage(id, formdata);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deletePackage = (id) => async (dispatch) => {
  try {
    const { data } = await API.deletePackage(id);
    console.log(data);
    dispatch({ type: DELETE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
