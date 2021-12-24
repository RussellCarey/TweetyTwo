import { FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme/theme";
import { HoverOutline, FocusInput } from "../../mixins/mixins";

const Container = styled.div`
  width: 100% !important;
  min-width: 100% !important;
  height: 50px;
  padding: 0 ${theme.spacing.space.xsmall};
`;

const Title = styled.p`
  color: grey;
  font-size: ${theme.fonts.fontsizes.small};
`;

const Input = styled.input`
  width: 100% !important;
  min-width: 100% !important;
  height: 50px;
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
  return (
    <Container>
      <Title>{type}</Title>
      <Input type={type} value={value} onChange={onChange} id={id} />
    </Container>
  );
};

export default DateTimeInput;
