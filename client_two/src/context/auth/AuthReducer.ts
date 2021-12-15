import { SET_LOGIN_DATA } from "./types";

const Reducer = (state: any, action: any) => {
  switch (action.type) {
    // Set the new survey title of building survey
    case SET_LOGIN_DATA:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export default Reducer;
