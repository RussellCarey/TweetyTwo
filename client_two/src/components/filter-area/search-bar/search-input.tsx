import React, { FunctionComponent, useContext } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme/theme";

import JobsContext from "../../../context/jobs/JobsContext";

const Container = styled.input`
  width: 100%;
  height: 100%;
  font-size: ${theme.fonts.fontsizes.medium};
  color: ${theme.colors.text.white};

  background-color: transparent;
  border: none;
  outline: none;
`;

const SearchInput: FunctionComponent = () => {
  const jobsContext = useContext(JobsContext);
  const { searchJobsByText } = jobsContext;

  const onChangeHandler = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    searchJobsByText(target.value);
  };

  return <Container placeholder="Search your tweets.." onChange={onChangeHandler}></Container>;
};

export default SearchInput;
