import { FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme/theme";
import { ITextAreaProps, IWordCountProps } from "./types/types";
import { FocusInput, HoverOutline } from "../../mixins/mixins";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  @media (max-width: 550px) {
    margin-bottom: ${theme.spacing.space.large};
  }
`;

const TweetBox = styled.textarea`
  position: relative;
  width: 100%;
  height: 100%;

  outline: none;
  border: solid 1px ${theme.colors.border.main};
  border-radius: 15px;
  padding: ${theme.spacing.space.medium};

  font-size: ${theme.fonts.fontsizes.medium};
  color: ${theme.colors.text.white};
  background-color: ${theme.colors.ui.lightMain};
  resize: none;

  ${FocusInput}
  ${HoverOutline}

   @media (max-width: 550px) {
    width: 100%;
    flex-direction: column;
  }
`;

const WordCount = styled.p`
  position: absolute;
  right: ${theme.spacing.space.small};
  bottom: ${theme.spacing.space.small};
  z-index: 5000;

  font-size: ${theme.fonts.fontsizes.small};
  color: ${(props: IWordCountProps) => (props.wordCount >= 280 ? theme.colors.modal.error : theme.colors.text.grey)};
`;

const TextArea: FunctionComponent<ITextAreaProps> = ({ onChange, id, value }) => {
  return (
    <Container>
      <TweetBox id={id} value={value} placeholder="Type your tweet, make it a good one!" onChange={onChange}></TweetBox>
      <WordCount wordCount={value.length}>{`${value.length}/280`}</WordCount>
    </Container>
  );
};

export default TextArea;
