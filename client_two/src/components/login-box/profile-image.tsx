import { FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme/theme";

const Container = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;

  margin-bottom: ${theme.spacing.space.xxlarge};
`;

const LoginProfileImage: FunctionComponent = () => {
  return <Container src="./images/default-profile.svg" />;
};

export default LoginProfileImage;
