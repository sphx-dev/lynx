const RECORD_HEIGHT = 24;
const SPREAD_HEIGHT = 32;
const HEADER = 36;
export const getOrderBookRecords = (containerHeight: number) => {
  return Math.floor(
    (containerHeight - SPREAD_HEIGHT - HEADER) / RECORD_HEIGHT / 2
  );
};
