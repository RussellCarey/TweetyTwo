import { FunctionComponent, useContext } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme/theme";

import AuthContext from "../../../context/auth/AuthContext";

const Container = styled.div`
  height: min-content;
  width: min-content;
  margin-right: ${theme.spacing.space.large};
  border-radius: 50%;
  outline: 2px solid ${theme.colors.border.main};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
`;

const NavBarImage: FunctionComponent = () => {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  return (
    <Container>
      <ProfileImage
        src={authState.user?.profileImage ? authState.user?.profileImage : "./images/default-profile.svg"}
      />
    </Container>
  );
};

export default NavBarImage;
