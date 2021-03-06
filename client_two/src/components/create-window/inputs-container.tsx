import { FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme/theme";

const Container = styled.div`
  position: relative;
  width: 35%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr) !important;
  grid-gap: ${theme.spacing.space.xsmall};

  margin-left: ${theme.spacing.space.medium};

  @media (max-width: 750px) {
    width: 100%;
  }

  @media (max-width: 550px) {
    width: 100% !important;
    margin: 0;
  }
`;

const InputsContainer: FunctionComponent = ({ children }) => {
  return <Container>{children}</Container>;
};

export default InputsContainer;
