import { FunctionComponent, useContext, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme/theme";
import { Title } from "../resuable-styled/text";
import LoginButton from "./button";
import { NormalText } from "../resuable-styled/text";
import AuthContext from "../../context/auth/AuthContext";

import { useNavigate } from "react-router-dom";
import isDev from "../../utils/is-dev";

const LoginArea = styled.div`
  width: max-content;
  height: max-content;
  padding: ${theme.spacing.space.xxxlage};

  z-index: 10;
  background-color: ${theme.colors.ui.main};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.5);
`;

const LoginTitle = styled(Title)`
  margin-bottom: ${theme.spacing.space.small};
`;

const SubTitle = styled(NormalText)`
  margin-bottom: ${theme.spacing.space.large};
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: ${theme.spacing.space.xlarge};
  outline: 2px solid ${theme.colors.border.mainDark};
`;

const LoginBox: FunctionComponent = () => {
  let navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  useEffect(() => {
    if (authState.user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }

    if (!authState.user) navigate("/");
  }, [authState.user]);

  return (
    <LoginArea>
      {!authState.user ? (
        <>
          <LoginTitle>Welcome to Tweety</LoginTitle>
          <SubTitle>The simple tweet scheduler.</SubTitle>
          <SubTitle>{`Currently in dev? ${isDev()}`}</SubTitle>
          <LoginButton />
        </>
      ) : null}

      {authState.user ? (
        <>
          <LoginTitle>Welcome {authState.user.displayName}!!</LoginTitle>
          <SubTitle>Great to have you.</SubTitle>
          <Image src={authState.user.profileImage} alt="userimage"></Image>
          <SubTitle>Please wait, loading your data.</SubTitle>
        </>
      ) : null}
    </LoginArea>
  );
};

export default LoginBox;
