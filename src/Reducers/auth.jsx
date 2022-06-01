import { ERROR, SIGNIN, LOGOUT } from "../Constants/actionTypes";
const token = localStorage.getItem("TourismSecurityTokenAdmin");
const name = localStorage.getItem("TourismAuthName");
const email = localStorage.getItem("TourismAuthEmail");
const initialState = token ? { token, user: { name, email } } : {};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      console.log(action.payload.user);
      if (action?.payload.user.role === "Admin") {
        localStorage.setItem(
          "TourismSecurityTokenAdmin",
          action?.payload.token
        );
        localStorage.setItem("TourismAuthName", action?.payload.user.name);
        localStorage.setItem("TourismAuthEmail", action?.payload.user.email);
        window.location.href = "/";
        return { ...state, user: action?.payload.user };
      } else {
        return { ...state, error: "Login Failed, login as admin" };
      }
    case LOGOUT:
      localStorage.removeItem("TourismSecurityTokenAdmin");
      localStorage.removeItem("TourismAuthName");
      localStorage.removeItem("TourismAuthEmail");
      return state;
    case ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default reducer;
