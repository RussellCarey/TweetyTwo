import { ERequestOutcomes } from "../../../types/errors";
import { ITweetObject } from "../types/types";

export const checkWordCount = (wordCount: number) => {
  if (wordCount >= 280) return false;
  if (wordCount <= 0) return false;
  return true;
};

export const checkDateInputs = (tweet: ITweetObject) => {
  if (tweet.date === "" || tweet.date === null) return false;
  if (tweet.time === "" || tweet.time === null) return false;
  if (tweet.unix === 0) return false;
  return true;
};

export const checkFileSize = (file: File) => {
  if (file.size > 10000000) return ERequestOutcomes.isEmpty;
  if (file.size <= 10000000) return file;
};
