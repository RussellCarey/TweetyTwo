import { FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme/theme";

const Container = styled.div`
  width: 35%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: ${theme.spacing.space.xsmall};

  margin-left: ${theme.spacing.space.medium};

  @media (max-width: 750px) {
    width: 100%;
  }

  @media (max-width: 550px) {
    margin: 0;
  }
`;

const InputsContainer: FunctionComponent = ({ children }) => {
  return <Container>{children}</Container>;
};

export default InputsContainer;
