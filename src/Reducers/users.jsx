import { FETCH_ALL_USERS } from "../Constants/actionTypes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return {
        ...state,
        users: action.payload.users,
        totalUsers: action.payload.total,
      }; //returning the users

    default:
      return state;
  }
};
export default reducer;
