import styled from "styled-components";
import { theme } from "../../styles/theme/theme";

export const Title = styled.h1`
  color: ${theme.colors.text.white};
  font-weight: 300;
  font-size: ${theme.fonts.fontsizes.xlarge};

  @media (max-width: 500px) {
    font-size: ${theme.fonts.fontsizes.large};
  }

  @media (max-width: 450px) {
    display: none;
  }
`;

export const Link = styled.h5`
  color: ${theme.colors.text.grey};
  font-weight: 300;
  font-size: ${theme.fonts.fontsizes.medium};
`;

export const NormalText = styled.p`
  color: ${theme.colors.text.grey};
  font-weight: 300;
  font-size: ${theme.fonts.fontsizes.medium};
  text-overflow: ellipsis;
`;
