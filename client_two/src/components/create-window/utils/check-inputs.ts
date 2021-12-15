export const checkWordCount = (wordCount: number) => {
  if (wordCount >= 280) return false;
  if (wordCount <= 0) return false;
  return true;
};

export const checkDateInputs = (date: string, time: string) => {
  if (date === "" || date === null) return false;
  if (time === "" || time === null) return false;
  return true;
};
