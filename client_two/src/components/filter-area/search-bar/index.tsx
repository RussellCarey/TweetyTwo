import { FunctionComponent } from "react";
import styled from "styled-components";
import { HoverOutline } from "../../../mixins/mixins";
import { theme } from "../../../styles/theme/theme";

import SearchInput from "./search-input";
import OrderInput from "../dropdown/order-select";

const Container = styled.div`
  width: 100%;
  height: max-content;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  width: 40%;

  border: solid 1px ${theme.colors.border.main};
  border-radius: 15px !important;

  display: flex;
  align-items: center;
  justify-content: space-between;

  //prettier-ignore
  padding:  ${theme.spacing.space.small};

  margin-bottom: ${theme.spacing.space.xxxlage};

  ${HoverOutline}

  @media (max-width: 650px) {
    width: 100%;
  }
`;

const SearchBox: FunctionComponent = () => {
  return (
    <Container>
      <SearchContainer>
        <SearchInput />
      </SearchContainer>
    </Container>
  );
};

export default SearchBox;
