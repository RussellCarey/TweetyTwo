import React, { FunctionComponent, useEffect, useContext } from "react";
import ScheduleList from "../../components/jobs";
import NavBar from "../../components/navbar";
import SearchBox from "../../components/filter-area/search-bar/index";
import { Container, Window } from "./main-view.styled";
import JobsContext from "../../context/jobs/JobsContext";
import Cookies from "js-cookie";
import AuthContext from "../../context/auth/AuthContext";
import CreateWindow from "../../components/create-window";
import Modal from "../../components/modal";
import { useNavigate } from "react-router-dom";
import ModalContext from "../../context/modal/ModalContext";

const MainView: FunctionComponent = () => {
  let navigate = useNavigate();
  const modalContext = useContext(ModalContext);
  const { modalState } = modalContext;
  const jobsContext = useContext(JobsContext);
  const { jobsState, getAllJobs } = jobsContext;
  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  useEffect(() => {
    // Return if not logged in..
    if (!authState.user || !Cookies.get("connect.sid")) navigate("/");
    getAllJobs();
  }, []);

  return (
    <Container>
      {modalState.show ? <Modal /> : null}
      {jobsState.showCreateWindow === true ? <CreateWindow /> : null}
      <Window>
        <NavBar />
        <SearchBox />
        <ScheduleList />
      </Window>
    </Container>
  );
};

export default MainView;
