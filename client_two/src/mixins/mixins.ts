import { css } from "styled-components";
import { theme } from "../styles/theme/theme";

export const ButtonHover = css`
  &:hover {
    transform: scale(101%);
    cursor: pointer;
    box-shadow: 0 5px 14px rgba(0, 0, 0, 0.3);
  }
`;

export const FocusInput = css`
  &:focus {
    outline: 1px solid ${theme.colors.ui.blue};
  }
`;

export const HoverOutline = css`
  transition: all 0.3s ease-in-out;
  outline: 1px solid transparent;

  &:hover {
    outline: 1px solid ${theme.colors.ui.blue};
  }
`;

export const HoverOutlineClick = css`
  transition: all 0.3s ease-in-out;
  outline: 1px solid transparent;

  &:hover {
    cursor: pointer;
    outline: 1px solid ${theme.colors.ui.blue};
    transform: scale(101%);
    box-shadow: 0 5px 14px rgba(0, 0, 0, 0.3);
  }
`;
