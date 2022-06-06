import { ERROR, SIGNIN, LOGOUT } from "../Constants/actionTypes";
const token = localStorage.getItem("TourismSecurityTokenAdmin");
const user = JSON.parse(localStorage.getItem("TourismAdmin"));
const initialState = token ? { token, user } : {};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      console.log(action.payload.user);
      if (action?.payload.user.role === "Admin") {
        console.log(action.payload.token);
        localStorage.setItem(
          "TourismSecurityTokenAdmin",
          action?.payload.token
        );
        localStorage.setItem(
          "TourismAdmin",
          JSON.stringify(action?.payload.user)
        );
        window.location.href = "/";
        return { ...state, user: action?.payload.user };
      } else {
        return { ...state, error: "Login failed, You are not an Admin" };
      }
    case LOGOUT:
      localStorage.removeItem("TourismSecurityTokenAdmin");
      localStorage.removeItem("TourismAdmin");
      window.location.href = "/";
      return state;
    case ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default reducer;
