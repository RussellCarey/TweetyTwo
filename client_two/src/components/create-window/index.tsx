import React, { FunctionComponent, useState, useRef, useContext } from "react";
import axios from "axios";
import * as Cookies from "js-cookie";
import styled from "styled-components";
import { theme } from "../../styles/theme/theme";

import { useSpring, animated } from "react-spring";

import ModalContext from "../../context/modal/ModalContext";

import TextArea from "./textbox";
import InputsContainer from "./inputs-container";
import DateTimeInput from "./input";
import CreateButtons from "./button";

import { ERequestOutcomes } from "../../types/errors";
import { EModal } from "../../context/modal/types";
import { uploadImageFile, uploadTweet } from "./services/dbServices";

import { checkDateInputs, checkFileSize, checkWordCount } from "./utils/check-inputs";

import JobsContext from "../../context/jobs/JobsContext";
import { convertTimeDateToUnix } from "./utils/convert-to-unix";

const Container = styled(animated.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 500;

  width: 100vw;
  height: 150px;
  padding: ${theme.spacing.space.large} ${theme.spacing.space.xxxlage};

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${theme.colors.ui.main};
  box-shadow: 0 -20px 30px rgba(0, 0, 0, 0.2);

  @media (max-width: 550px) {
    height: 300px;
    flex-direction: column;
    padding: ${theme.spacing.space.small} ${theme.spacing.space.large};
    bottom: 50px;
  }
`;

const FileInput = styled.input`
  display: none;
  opacity: 100%;
`;

const CreateWindow: FunctionComponent = () => {
  const modalContext = useContext(ModalContext);
  const { showModal } = modalContext;
  const jobsContext = useContext(JobsContext);
  const { closeCreateWindow, addNewJob } = jobsContext;
  const imageInputElement = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [file, setFile] = useState<File | null>();
  const [tweet, setTweet] = useState({
    message: "",
    date: "",
    time: "",
    unix: 0,
  });

  const animationProps = useSpring({
    from: { transform: "translateY(400px)", opacity: 0 },
    to: { transform: "translateY(0px)", opacity: 1 },
    delay: 100,
  });

  const dataChangeHandler = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const variable = target.id!;
    setTweet({ ...tweet, [variable]: target.value, unix: convertTimeDateToUnix(tweet.date, tweet.time) || 0 });
  };

  const imageOnClickHandler = () => {
    imageInputElement.current.click();
  };

  const imageOnChangeHandler = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    // Check file size is under 10mb to give warning (not allowed on server)
    const checkFile = checkFileSize(target.files![0]);
    if (checkFile === ERequestOutcomes.isEmpty) showModal("Image size limit is 10MB", EModal.hasError);

    setFile(target.files![0]);
  };

  const uploadImage = async () => {
    if (!file) return ERequestOutcomes.isEmpty;
    const uploadImageReq = await uploadImageFile(file);
    if (uploadImageReq.hasError) return ERequestOutcomes.hasError;
    return uploadImageReq;
  };

  //! Need to add modal and resposnes from modal..
  const handleSubmitClick = async () => {
    if (!checkWordCount(tweet.message.length)) return showModal("Please check your word count", EModal.hasError);
    if (!checkDateInputs(tweet)) return showModal("Please check your date or time", EModal.hasError);

    const uploadImageAttempt = await uploadImage();
    if (uploadImageAttempt === ERequestOutcomes.hasError)
      return showModal("Error creating tweety. Please try again.", EModal.hasError);

    const submittedTweet = await uploadTweet(tweet, uploadImageAttempt.data);
    if (submittedTweet === ERequestOutcomes.hasError)
      return showModal("Error creating tweet. Please try again.", EModal.hasError);

    showModal("Tweet created!", EModal.isOK);

    setTimeout(() => {
      closeCreateWindow();
      addNewJob(submittedTweet.data.jobs.rows);
    }, 3000);
  };

  return (
    <Container style={animationProps}>
      <TextArea value={tweet.message} onChange={dataChangeHandler} id="message" />
      <InputsContainer>
        <DateTimeInput type={"date"} value={tweet.date} onChange={dataChangeHandler} id="date" />
        <DateTimeInput type={"time"} value={tweet.time} onChange={dataChangeHandler} id="time" />
        <CreateButtons text={file ? file.name : "add image"} onClick={imageOnClickHandler} />
        <CreateButtons text={"submit"} onClick={handleSubmitClick} />
        <FileInput
          id="file-select"
          type="file"
          accept="image/*"
          ref={imageInputElement}
          onChange={imageOnChangeHandler}
        />
      </InputsContainer>
    </Container>
  );
};

export default CreateWindow;
