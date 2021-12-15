import { FunctionComponent, useContext } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme/theme";
import NavBarImage from "./image";
import NavTitle from "./title";

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
      <NavTitle text={authState.user ? `Welcome ${authState.user.displayName}!` : "Welcome "} />
    </Container>
  );
};

export default UserInfo;
