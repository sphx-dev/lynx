interface FormatNumber {
  value: number;
  fixed?: number;
  before?: string;
  after?: string;
}
export const formatNumber = ({
  value,
  fixed = 2,
  before = "",
  after = "",
}: FormatNumber) => {
  try {
    const formattedValue = value.toFixed(fixed);
    const localeValue = Number(formattedValue).toLocaleString("en-GB");
    return String(before || "") + localeValue + String(after || "");
  } catch (e) {
    return value;
  }
};
