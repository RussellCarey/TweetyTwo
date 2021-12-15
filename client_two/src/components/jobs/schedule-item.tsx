import { FunctionComponent } from "react";
import { NormalText } from "../resuable-styled/text";
import { IRequestJobObject } from "../../types/types";
import DeleteButton from "./delete-button";
import { formateTimeToString, formatDateToString } from "./utils/formate-date";
import { Container, MiniImage, DateTimeArea, Message } from "./schedule-item.styled";

// Interface for this job object?
interface IProps {
  jobData: IRequestJobObject;
}

// jobData has image_name or image_url
const ScheduleItem: FunctionComponent<IProps> = ({ jobData }) => {
  return (
    <Container>
      {jobData.image_url ? (
        <MiniImage src="./images/image-solid.png" alt="image tweet" />
      ) : (
        <MiniImage src="./images/comment.png" alt="text only tweet" />
      )}
      <Message>{jobData.message}</Message>
      <DateTimeArea>
        <NormalText>{jobData.status}</NormalText>
        <NormalText>{formatDateToString(jobData.date)}</NormalText>
        <NormalText>{formateTimeToString(jobData.date)}</NormalText>
      </DateTimeArea>

      <DeleteButton id={jobData.job_id} />
    </Container>
  );
};

export default ScheduleItem;
