export const SHOW_MODAL = "SHOW_MODAL";
export const RESET_MODAL = "RESET_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";

export enum EModal {
  isOK = "isOK",
  hasError = "hasError",
}

export interface IProps {
  children: React.ReactNode;
}

export interface IModalState {
  show: boolean;
  text: string;
  type: EModal | null;
}
