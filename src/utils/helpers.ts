const RECORD_HEIGHT = 24;
const SPREAD_HEIGHT = 32;
export const getOrderBookRecords = (containerHeight: number) => {
  return Math.floor((containerHeight - SPREAD_HEIGHT) / RECORD_HEIGHT / 2);
};
