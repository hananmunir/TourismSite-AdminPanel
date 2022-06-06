import { FETCH_ALL, CREATE, DELETE, UPDATE } from "../Constants/actionTypes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        packages: action.payload.packages,
        totalPackages: action.payload.totalPackages,
      };
    case CREATE:
      return {
        ...state,
        packages: [...state.packages, action.payload],
        totalPackages: state.totalPackages + 1,
      };
    case UPDATE:
      console.log(action.payload);
      return { ...state, packages: [...state.packages] };
    case DELETE:
      return {
        ...state,
        packages: state.packages.filter(
          (tripPack) => tripPack._id !== action.payload
        ),
        totalPackages: state.totalPackages - 1,
      };
    default:
      return state;
  }
};
export default reducer;
