import styled from "styled-components";
import { theme } from "../../styles/theme/theme";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${theme.colors.ui.main};

  overflow: hidden;
`;

export const Window = styled.div`
  width: calc(100vw - ${theme.spacing.space.xxxlage});
  height: calc(100vh - ${theme.spacing.space.xxxlage});

  background-color: ${theme.colors.ui.main};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
  border-radius: 20px;

  padding: ${theme.spacing.space.xlarge} ${theme.spacing.space.xxlarge};

  display: flex;
  flex-direction: column;

  @media (max-width: 750px) {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    padding: ${theme.spacing.space.medium} ${theme.spacing.space.large};
  }
`;
