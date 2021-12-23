import React, { FunctionComponent, useContext, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme/theme";
import { ButtonHover } from "../../mixins/mixins";
import JobsContext from "../../context/jobs/JobsContext";

const Container = styled.button`
  color: ${theme.colors.text.white};
  background-color: ${theme.colors.ui.blue};

  width: 100px;
  height: 40px;

  border-radius: 15px;

  outline: none;
  border: 1px solid ${theme.colors.border.main};

  font-size: ${theme.fonts.fontsizes.medium};

  ${ButtonHover}
`;

const CreateNewButton: FunctionComponent = () => {
  const jobsContext = useContext(JobsContext);
  const { jobsState, showCreateWindow, closeCreateWindow } = jobsContext;

  const onClickHandler = (e: React.MouseEvent) => {
    if (jobsState.showCreateWindow) {
      closeCreateWindow();
    }

    if (!jobsState.showCreateWindow) {
      showCreateWindow();
    }
  };

  return <Container onClick={onClickHandler}>{jobsState.showCreateWindow ? "Close" : "New"}</Container>;
};

export default CreateNewButton;
