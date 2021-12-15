import { ERequestOutcomes } from "../../../types/errors";

export interface ITweetObject {
  message: string;
  date: string;
  time: string;
}

export interface IUploadAttempt {
  url: string;
  name: string;
  hasError: ERequestOutcomes.hasError;
  isEmpty: ERequestOutcomes.isEmpty;
}

export interface ITextAreaProps {
  onChange?: (e: any) => void;
  id: string;
  value: string;
}

export interface IWordCountProps {
  wordCount: number;
}
