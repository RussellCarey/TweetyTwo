import { FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme/theme";
import { HoverOutline, FocusInput } from "../../mixins/mixins";

const Container = styled.input`
  min-width: 98% !important;
  height: 100%;
  max-height: 50px;

  color: ${theme.colors.ui.blue};
  padding: ${theme.spacing.space.medium};
  border: 1px solid ${theme.colors.border.main};
  border-radius: 15px !important;

  ${FocusInput}
  ${HoverOutline}
`;

interface IProps {
  type: string;
  onChange?: (e: any) => void;
  id: string;
  value: string;
}

const DateTimeInput: FunctionComponent<IProps> = ({ type, onChange, id, value }) => {
  return <Container type={type} value={value} onChange={onChange} id={id} />;
};

export default DateTimeInput;
