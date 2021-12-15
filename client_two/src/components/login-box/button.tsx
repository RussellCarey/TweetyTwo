import { FunctionComponent, ReactNode } from "react";

import styled from "styled-components";
import { theme } from "../../styles/theme/theme";
import { ButtonHover } from "../../mixins/mixins";

const Container = styled.button`
  color: ${theme.colors.text.white};
  background-color: ${theme.colors.ui.blue};

  width: max-content;
  height: max-content;
  font-size: ${theme.fonts.fontsizes.large};
  padding: ${theme.spacing.space.medium} ${theme.spacing.space.medium};

  border-radius: 15px;

  outline: none;
  border: none;

  ${ButtonHover}
`;

const LoginButton: FunctionComponent = () => {
  return (
    <a href="http://127.0.0.1:3333/api/auth/twitter">
      <Container>Login to twitter!</Container>
    </a>
  );
};

export default LoginButton;
