import { useReducer } from "react";
import axios from "axios";
import * as Cookies from "js-cookie";
import { ERequestOutcomes } from "../../types/errors";
import { SET_LOGIN_DATA, IProps, IStateProps, IUserData } from "./types";

import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

const AuthState = (props: IProps) => {
  const state: IStateProps = {
    isLoggedIn: false,
    jwt: "",
    user: null,
  };

  const [authState, dispatch] = useReducer(AuthReducer, state);

  const getUserData = async () => {
    try {
      const user = await axios.request({
        method: "POST",
        withCredentials: true,
        url: `http://localhost:3333/api/auth/getUserData`,
        headers: {
          authorization: `${Cookies.get("token")}`,
        },
      });

      if (user.data.data === null) return ERequestOutcomes.hasError;
      dispatch({ type: SET_LOGIN_DATA, payload: user.data.data });
    } catch (error: any) {
      //! Just show modal, no need to return..
      return ERequestOutcomes.hasError;
    }
  };

  const logoutUser = async () => {
    try {
      const user = await axios.request({
        method: "GET",
        withCredentials: true,
        url: `http://127.0.0.1:3333/api/auth/logout`,
        headers: {
          authorization: `${Cookies.get("token")}`,
        },
      });

      if (user.data.data === null) return ERequestOutcomes.hasError;

      dispatch({ type: SET_LOGIN_DATA, payload: null });
      return ERequestOutcomes.success;
    } catch (error: any) {
      return ERequestOutcomes.hasError;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        getUserData,
        logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
