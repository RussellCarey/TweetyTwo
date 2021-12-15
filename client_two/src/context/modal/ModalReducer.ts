import { SHOW_MODAL, RESET_MODAL, HIDE_MODAL, IModalState } from "./types";

const Reducer = (state: IModalState, action: any) => {
  switch (action.type) {
    // Set the new survey title of building survey
    case SHOW_MODAL:
      return action.payload;

    case HIDE_MODAL:
      return action.payload;

    case RESET_MODAL:
      return action.payload;

    default:
      return state;
  }
};

export default Reducer;
