import DateConverter from "date-and-time";

export const convertTimeDateToUnix = (date: string, time: string) => {
  if (date && time) {
    const dateObj = new Date(date);

    // Add 0 to days / months that are less than 10..
    const month = dateObj.getMonth() + 1 < 10 ? `0${dateObj.getMonth() + 1}` : `${dateObj.getMonth() + 1}`;
    const day = dateObj.getDate() + 1 < 10 ? `0${dateObj.getDate() + 1}` : `${dateObj.getDate() + 1}`;

    // had difficulty with date trasforming so used this npm package. (maybe too many steps) (refactor later)..
    const convertedDate = DateConverter.parse(
      `${dateObj.getFullYear()}/${month}/${day} ${time}:00`,
      "YYYY/MM/DD HH:mm:ss"
    );

    // Convert to unix time for the database..
    const unixTime = new Date(convertedDate).getTime();
    console.log(unixTime);
    return unixTime;
  } else {
    return 0;
  }
};
