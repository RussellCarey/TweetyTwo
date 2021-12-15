import { FunctionComponent, useContext } from "react";
import { theme } from "../../styles/theme/theme";
import styled from "styled-components";
import JobsContext from "../../context/jobs/JobsContext";
import { IRequestJobObject } from "../../types/types";

import ScheduleItem from "./schedule-item";

const Container = styled.div`
  width: 100%;
  height: max-content;
  padding: ${theme.spacing.space.small} 2px;

  overflow-y: scroll;
`;

const ScheduleList: FunctionComponent = () => {
  const jobsContext = useContext(JobsContext);
  const { jobsState } = jobsContext;

  return (
    <Container>
      {console.log(jobsState.jobs)}
      {jobsState.jobs
        ? jobsState.jobs.map((jobs: IRequestJobObject) => {
            return <ScheduleItem key={jobs.job_id} jobData={jobs} />;
          })
        : null}
    </Container>
  );
};

export default ScheduleList;
