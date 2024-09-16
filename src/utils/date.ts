import dayjs from "dayjs";

export const dateToDisplay = (date: dayjs.ConfigType) =>
  dayjs(date).format("YYYY-MM-DD HH:mm:ss");

export const showTime = (date: dayjs.ConfigType) =>
  dayjs(date).format("HH:mm:ss");
