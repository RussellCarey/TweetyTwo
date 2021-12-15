import { FunctionComponent, useContext, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme/theme";

import { EModal } from "../../context/modal/types";
import ModalContext from "../../context/modal/ModalContext";

interface ICompProps {
  type: EModal;
}

const Container = styled.div`
  width: max-content;
  height: max-content;
  border-radius: 15px;

  position: absolute;
  top: ${theme.spacing.space.large};
  left: calc(50vw - (max-content / 2));
  z-index: 1000;

  outline: 5px solid ${theme.colors.border.mainDark};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  color: ${theme.colors.text.white};
  padding: ${theme.spacing.space.large};
  background-color: ${(props: ICompProps) =>
    props.type === EModal.hasError ? theme.colors.modal.error : theme.colors.modal.ok};
`;

const Modal: FunctionComponent = () => {
  const modalContext = useContext(ModalContext);
  const { modalState, hideModal } = modalContext;

  useEffect(() => {
    setTimeout(() => {
      hideModal();
    }, 3000);
  }, []);

  return <Container type={modalState.type}>{modalState.text}</Container>;
};

export default Modal;
