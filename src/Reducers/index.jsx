import { combineReducers } from "redux";
import Packages from "./packages";
import Auth from "./auth";
import Users from "./users";

export default combineReducers({
  Packages,
  Auth,
  Users,
});
