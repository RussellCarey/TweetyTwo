export const formateTimeToString = (date: string) => {
  const datey = new Date(+date);
  const hours = datey.getHours();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const minutes = datey.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}`;
};

export const formatDateToString = (date: string) => {
  const datey = new Date(+date);
  const year = datey.getFullYear();
  const month = datey.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const day = datey.getDate();
  const formattedDay = day < 10 ? `0${day}` : day;
  return `${year}/${formattedMonth}/${formattedDay}`;
};
