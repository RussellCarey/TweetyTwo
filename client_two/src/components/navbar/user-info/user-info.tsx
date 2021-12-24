import { FunctionComponent, useContext } from "react";
import styled from "styled-components";
import NavBarImage from "./image";
import { Title } from "../../resuable-styled/text";

import AuthContext from "../../../context/auth/AuthContext";

const Container = styled.div`
  width: max-content;
  height: min-content;

  display: flex;
  align-items: center;
`;

const UserInfo: FunctionComponent = () => {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;
  return (
    <Container>
      <NavBarImage />
      <Title>{authState.user ? `Welcome ${authState.user.displayName}!` : "Welcome "}</Title>
    </Container>
  );
};

export default UserInfo;
