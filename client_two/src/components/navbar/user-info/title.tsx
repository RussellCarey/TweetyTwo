import { FunctionComponent, useContext } from "react";
import { Title } from "../../resuable-styled/text";

interface IProp {
  text: string;
}

const NavTitle: FunctionComponent<IProp> = ({ text }) => {
  return <Title>{text}</Title>;
};

export default NavTitle;
