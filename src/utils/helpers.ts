const RECORD_HEIGHT = 24;
const SPREAD_HEIGHT = 32;
const HEADER = 36;
const TRADES_HEIGHT = 28.5;
export const getOrderBookRecords = (containerHeight: number) => {
  return Math.floor(
    (containerHeight - SPREAD_HEIGHT - HEADER) / RECORD_HEIGHT / 2
  );
};

export const getTradesRecords = (containerHeight: number) => {
  const records = Math.floor((containerHeight - HEADER) / TRADES_HEIGHT);
  return records > 0 ? records : 0;
};
