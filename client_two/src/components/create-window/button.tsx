import { FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme/theme";
import { ButtonHover, HoverOutline } from "../../mixins/mixins";

const Container = styled.button`
  width: 100%;
  height: 100%;
  max-height: 50px;

  background-color: ${theme.colors.ui.main};
  border: 1px solid ${theme.colors.border.main};
  border-radius: 15px 15px 15px 15px;

  color: ${theme.colors.text.white};

  transition: all 0.1s ease-in-out;
  ${ButtonHover}
  ${HoverOutline}
`;

interface IProps {
  text: string;
  onClick?: (e: any) => void;
}

const CreateButtons: FunctionComponent<IProps> = ({ text, onClick }) => {
  return <Container onClick={onClick}>{text}</Container>;
};

export default CreateButtons;
