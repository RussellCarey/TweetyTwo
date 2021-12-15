import { FunctionComponent, useContext } from "react";
import styled, { css } from "styled-components";
import { theme } from "../../styles/theme/theme";
import { ButtonHover } from "../../mixins/mixins";
import JobsContext from "../../context/jobs/JobsContext";
import ModalContext from "../../context/modal/ModalContext";
import { EModal } from "../../context/modal/types";
import { ERequestOutcomes } from "../../types/errors";

const Container = styled.button`
  width: 40px;
  height: 40px;

  background-color: ${theme.colors.ui.blue};
  color: ${theme.colors.text.white};
  font-size: ${theme.fonts.fontsizes.small};
  border-radius: 30%;

  display: flex;
  justify-content: center;
  align-items: center;

  justify-self: end;
  align-self: center;

  transition: all 0.2s;

  outline: none;
  border: none;

  ${ButtonHover}

  @media (max-width: 750px) {
    grid-row: 1/3;
    grid-column: 2/3;
    align-self: center;
  }
`;

interface IProps {
  id: string;
}

const DeleteButton: FunctionComponent<IProps> = ({ id }) => {
  const jobsContext = useContext(JobsContext);
  const { deletePostByID, removeJobFromState } = jobsContext;
  const modalContext = useContext(ModalContext);
  const { showModal } = modalContext;

  const onClickHandler = async () => {
    const deletedItem = await deletePostByID(id);
    if (deletedItem === ERequestOutcomes.hasError) return showModal("Error deleting tweet", EModal.hasError);
    if (deletedItem.rows?.length < 1) return showModal("Error deleting tweet", EModal.hasError);

    showModal("Deleted tweet!", EModal.isOK);

    setTimeout(() => {
      removeJobFromState(deletedItem.data?.job_id);
    }, 1500);
  };

  return <Container onClick={onClickHandler}>X</Container>;
};

export default DeleteButton;
