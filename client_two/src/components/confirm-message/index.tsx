import { FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme/theme";

const DarkWindow = styled.div`
  width: 100vw;
  height: 100vw;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmWindow: FunctionComponent = () => {
  return <DarkWindow></DarkWindow>;
};

export default ConfirmWindow;
