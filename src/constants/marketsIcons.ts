import btcIcon from "@/assets/icons/tickers/btc.svg";
import ngxIcon from "@/assets/icons/tickers/ngx.svg";
import oilIcon from "@/assets/icons/tickers/usoil.svg";
import infoIcon from "@/assets/icons/tickers/info.svg";

export const marketsIcons: {
  [key: string]: { icon: string };
} = {
  "BTCUSDC.P": { icon: btcIcon },
  "NGXUSDC.P": { icon: ngxIcon },
  "WTXUSDC.P": { icon: oilIcon },
  default: { icon: infoIcon },
};

export const marketPriority: {
  [key: string]: number;
} = {
  "BTCUSDC.P": 100,
  "NGXUSDC.P": 100,
  "WTXUSDC.P": 1000,
};
