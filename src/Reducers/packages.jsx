import { FETCH_ALL, CREATE } from "../Constants/actionTypes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        packages: action.payload.packages,
        totalPackages: action.payload.totalPackages,
      };
    case CREATE:
      return state.packages.push(action.payload);
    default:
      console.log("State in packages", state);
      return state;
  }
};
export default reducer;
