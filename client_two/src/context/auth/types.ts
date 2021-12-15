export const SET_LOGIN_DATA = "SET_LOGIN_DATA";

export interface IProps {
  children: React.ReactNode;
}

export interface IUserData {
  displayName: string;
  email: string;
  iat: number;
  id: string;
  profileImage: string;
  username: string;
}

export interface IStateProps {
  isLoggedIn: boolean;
  jwt: string;
  user: IUserData | null;
}
