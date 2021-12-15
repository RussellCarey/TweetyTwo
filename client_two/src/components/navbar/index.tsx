import { FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme/theme";
import UserInfo from "./user-info/user-info";
import CreateNewButton from "./create-new-button";
import LogoutButton from "./logout-button";

const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: ${theme.spacing.space.xxxlage};
`;

const ButtonContainer = styled.div`
  width: calc(200px + 20px);
  height: max-content;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavBar: FunctionComponent = () => {
  return (
    <Container>
      <UserInfo />
      <ButtonContainer>
        <CreateNewButton />
        <LogoutButton />
      </ButtonContainer>
    </Container>
  );
};

export default NavBar;
