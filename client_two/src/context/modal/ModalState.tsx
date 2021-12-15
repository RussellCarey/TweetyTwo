import React, { useReducer } from "react";

import { SHOW_MODAL, RESET_MODAL, HIDE_MODAL, IProps, IModalState, EModal } from "./types";

import ModalContext from "./ModalContext";
import ModalReducer from "./ModalReducer";

const ModalState = (props: IProps) => {
  const state: IModalState = {
    show: false,
    text: "",
    type: null,
  };

  const [modalState, dispatch] = useReducer(ModalReducer, state);

  const showModal = (text: string, type: EModal) => {
    const payload = { text: text, show: true, type: type };
    dispatch({
      type: SHOW_MODAL,
      payload: payload,
    });
  };

  const hideModal = () => {
    const payload = { ...modalState, show: false };
    dispatch({
      type: HIDE_MODAL,
      payload: payload,
    });
  };

  const resetModal = () => {
    const payload = { text: "", show: false };
    dispatch({
      type: RESET_MODAL,
      payload: payload,
    });
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        showModal,
        hideModal,
        resetModal,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalState;
