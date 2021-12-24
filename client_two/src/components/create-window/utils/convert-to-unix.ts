import DateConverter from "date-and-time";

export const convertTimeDateToUnix = (date: string, time: string) => {
  if (date && time) {
    const dateObj = new Date(date);

    // had difficulty with date trasforming so used this npm package. (maybe too many steps) (refactor later)..
    const convertedDate = DateConverter.parse(
      `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()} ${time}:00`,
      "YYYY/MM/DD HH:mm:ss"
    );

    // Convert to unix time for the database..
    const unixTime = new Date(convertedDate).getTime();
    return unixTime;
  } else {
    return 0;
  }
};
