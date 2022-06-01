import { FETCH_ALL_USERS } from "../Constants/actionTypes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL_USERS:
      console.log(action.payload);
      return {
        users: action.payload.users,
        totalUsers: action.payload.total,
      }; //returning the users

    default:
      return state;
  }
};
export default reducer;
