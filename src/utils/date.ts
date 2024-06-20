import dayjs from "dayjs";

export const dateToDisplay = (date: string) =>
  dayjs(date).format("YYYY-MM-DD HH:mm:ss");

export const showTime = (date: string) => dayjs(date).format("HH:mm:ss");
