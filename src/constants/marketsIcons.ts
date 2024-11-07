import btcIcon from "@/assets/icons/tickers/btc.svg";
import ethIcon from "@/assets/icons/tickers/eth.svg";
import oilIcon from "@/assets/icons/tickers/usoil.svg";
import infoIcon from "@/assets/icons/tickers/info.svg";

export const marketsIcons: {
  [key: string]: { icon: string };
} = {
  "BTCUSDC.P": { icon: btcIcon },
  "ETHUSDC.P": { icon: ethIcon },
  "WTXUSDC.P": { icon: oilIcon },
  default: { icon: infoIcon },
};
