import { FunctionComponent, useContext } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme/theme";
import { ButtonHover } from "../../mixins/mixins";
import ModalContext from "../../context/modal/ModalContext";
import { EModal } from "../../context/modal/types";
import AuthContext from "../../context/auth/AuthContext";
import { ERequestOutcomes } from "../../types/errors";

import { useNavigate } from "react-router-dom";

const Container = styled.button`
  color: ${theme.colors.text.white};
  background-color: ${theme.colors.ui.blue};

  width: 100px;
  height: 40px;

  border-radius: 15px;

  outline: none;
  border: 1px solid ${theme.colors.border.main};

  font-size: ${theme.fonts.fontsizes.medium};

  ${ButtonHover}
`;

const LogoutButton: FunctionComponent = () => {
  let navigate = useNavigate();
  const modalContext = useContext(ModalContext);
  const { showModal } = modalContext;
  const authContext = useContext(AuthContext);
  const { logoutUser } = authContext;

  const onClickHandler = async () => {
    showModal("Logging out, please wait.", EModal.isOK);

    const logout = await logoutUser();

    setTimeout(() => {
      if (logout === ERequestOutcomes.success) return navigate("/");
      if (logout === ERequestOutcomes.hasError)
        return showModal("Error logging out, please try again", EModal.hasError);
    }, 2000);
  };
  return <Container onClick={onClickHandler}>logout</Container>;
};

export default LogoutButton;
