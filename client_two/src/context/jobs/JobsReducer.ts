import { SET_JOBS, SET_ALL_JOBS, RESET_JOBS, SHOW_WINDOW, CLOSE_WINDOW, IJobsState } from "./types";

const Reducer = (state: IJobsState, action: any) => {
  switch (action.type) {
    // Set the new survey title of building survey
    case SET_ALL_JOBS:
      return { ...state, jobs: action.payload, jobsOriginal: action.payload };

    case RESET_JOBS:
      return { ...state, jobs: state.jobsOriginal };

    case SET_JOBS:
      return { ...state, jobs: action.payload };

    case SHOW_WINDOW:
      return { ...state, showCreateWindow: true };

    case CLOSE_WINDOW:
      return { ...state, showCreateWindow: false };

    default:
      return state;
  }
};

export default Reducer;
