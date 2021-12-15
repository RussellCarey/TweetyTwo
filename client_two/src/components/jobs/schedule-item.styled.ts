import styled from "styled-components";
import { HoverOutline } from "../../mixins/mixins";
import { theme } from "../../styles/theme/theme";
import { NormalText } from "../resuable-styled/text";

export const Container = styled.div`
  width: 100%;
  height: 80px;
  padding: 0 ${theme.spacing.space.xlarge};

  border-radius: 20px;
  border: 1px solid ${theme.colors.border.main};

  display: grid;
  grid-template-columns: 30px 6fr 2fr 100px;

  grid-column-gap: ${theme.spacing.space.medium};
  margin-bottom: ${theme.spacing.space.medium};

  transition: all 0.2s ease-in-out;

  ${HoverOutline}

  @media (max-width: 1200px) {
    grid-template-columns: 30px 4fr 2fr 100px;
  }

  @media (max-width: 950px) {
    grid-template-columns: 30px 3fr 2fr 100px;
  }

  @media (max-width: 950px) {
    grid-template-columns: 30px 2fr 2fr 100px;
  }

  @media (max-width: 750px) {
    height: max-content;
    padding: ${theme.spacing.space.small};
    grid-row-gap: ${theme.spacing.space.small};
    grid-template-columns: px 1fr 100px;
    grid-template-rows: repeat(2, max-content);
  }

  @media (max-width: 750px) {
    grid-template-columns: 1fr min-content;
  }
`;

export const DateTimeArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 750px) {
    grid-row: 2/3;
    grid-column: 1/2;
  }
`;

export const Message = styled(NormalText)`
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: ${theme.fonts.fontsizes.medium};
  align-self: center;
`;

export const MiniImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: ${theme.spacing.space.medium};
  align-self: center;

  @media (max-width: 750px) {
    display: none;
  }
`;
