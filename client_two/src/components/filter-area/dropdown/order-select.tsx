// ------------------------------------------------------------------
// Not being used
// ------------------------------------------------------------------

import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme/theme";

import Select from "react-select";
import "react-dropdown/style.css";

import { EOrderJobs } from "../../../context/jobs/types";

const Container = styled(Select)`
  width: 30%;
  height: 100%;
  font-size: ${theme.fonts.fontsizes.medium};
  color: ${theme.colors.text.grey};
`;

const OrderInput: FunctionComponent = () => {
  const options = [
    { label: "Date Ascending", value: EOrderJobs.dateasc },
    { label: "Date Decending", value: EOrderJobs.datedec },
    { label: "Status", value: EOrderJobs.status },
  ];

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      fontWeight: state.isSelected ? "bold" : "normal",
      color: "orange",
      backgroundColor: state.data.bgcolor,
      fontSize: state.selectProps.myFontSize,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200,
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const [option, setOption] = useState(options[0]);

  const onChangeHandler = (e: any) => {
    setOption(e);
  };

  return (
    <Container
      options={options}
      onChange={onChangeHandler}
      value={option}
      placeholder="Select an option"
      styles={customStyles}
    />
  );
};

export default OrderInput;
