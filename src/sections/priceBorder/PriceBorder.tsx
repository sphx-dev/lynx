import styled from "styled-components";
import { Stack, Text } from "../../components";
import { formatNumber } from "@/utils/format";
import SymbolSelect from "../../components/SymbolSelect/SymbolSelect";
// import { useLocalStreaming } from "../chart/localStreaming";
import { useMarkets } from "@/hooks/useMarkets";
import { useQuery } from "react-query";
import config from "@/config";

const Wrapper = styled.div`
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 24px;
  width: 100%;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: var(--stroke-soft-200);
  min-height: 68px;
`;

enum ValueType {
  ERROR = "ERROR",
  ACTIVE = "ACTIVE",
  DEFAULT = "DEFAULT",
}
interface PriceViewParam {
  label: string;
  value: string | number;
  type?: ValueType;
  before?: string;
  after?: string;
}

const PriceView = ({
  label,
  value,
  before = "",
  after = "",
  type = ValueType.DEFAULT,
}: PriceViewParam) => {
  const colorsByType = {
    [ValueType.ACTIVE]: "bull", //themeColors.text.secondaryActive,
    [ValueType.ERROR]: "bear", //themeColors.text.error,
    [ValueType.DEFAULT]: "strong950", //themeColors.text.primary,
  };
  return (
    <Stack>
      <Text variant="textXSmall" color="sub600">
        {label}
      </Text>
      <Text variant="textMedium" color={colorsByType[type]}>
        {typeof value === "string" ? (
          value
        ) : (
          <NumberDisplay value={+value} before={before} after={after} />
        )}
      </Text>
    </Stack>
  );
};

const NumberDisplay = ({
  value,
  before = "",
  after = "",
}: {
  value: number;
  before?: string;
  after?: string;
}) => {
  const numStr = value.toFixed(10);
  let [intPart, decimalPart] = numStr.split(".");
  decimalPart = decimalPart?.replace(/0+$/, "");
  const decimalsNotZero = decimalPart?.replace(/^0+/, "");

  const zerosLength = decimalPart?.indexOf(decimalsNotZero);
  const zeros = Array(zerosLength).fill(0).join("");

  return (
    <>
      {before}
      {formatNumber({ value: +intPart })}
      {decimalPart && (
        <>
          .<span style={{ fontSize: "0.7em" }}>{zeros}</span>
          {decimalsNotZero}
        </>
      )}
      {after}
    </>
  );
};

const VerticalDivider = styled.div`
  width: 1px;
  height: 24px;
  margin: 0 10px 0 10px;
  background-color: var(--stroke-soft-200);
`;

const PriceBorder = () => {
  const unit = "$";

  const { selectedMarketId } = useMarkets();

  const { data: assetInfo } = useAssetInfo();
  const volume = assetInfo?.volume24h ?? 0;
  const lastPrice = assetInfo?.last_price ?? 0;
  const changeLastDay = assetInfo?.price24h ?? 0;
  const fundingRate = assetInfo?.funding_rate ?? 0.0001;
  const hasOpenInterest = !!assetInfo?.open_interest;
  const openInterest =
    assetInfo?.open_interest?.find(
      oi => oi.MarketID === selectedMarketId?.toString()
    )?.OI ?? 0;

  return (
    <Wrapper>
      <SymbolSelect />
      <VerticalDivider />
      <Text variant="textLarge" color="bull">
        {formatNumber({ value: +lastPrice })}
      </Text>
      <VerticalDivider />
      <PriceView
        label="Last Price"
        value={formatNumber({ value: +lastPrice, before: unit })}
        // value={+lastPrice}
        // before={unit}
        type={ValueType.ACTIVE}
      />
      {/* <PriceView
        label="Mark Price"
        value={formatNumber({ value: +price, before: unit })}
      />
      <PriceView
        label="Spot Oracle Price"
        value={formatNumber({ value: +price, before: unit })}
      /> */}
      <PriceView
        label="24h Change"
        value={formatNumber({ value: changeLastDay, before: unit })}
        // before={changeLastDay > 0 ? "+" : ""}
        // after="%"
        type={changeLastDay > 0 ? ValueType.ACTIVE : ValueType.ERROR}
      />
      {/* <PriceView
        label="Open Interest"
        value={formatNumber({ value: 22987672, before: unit })}
      /> */}
      <PriceView
        label="24h Volume"
        value={formatNumber({ value: volume, before: unit })}
      />
      <PriceView
        label="8h Funding"
        value={+fundingRate}
        before={fundingRate > 0 ? "+" : "-"}
        after="%"
        type={fundingRate > 0 ? ValueType.ACTIVE : ValueType.ERROR}
      />
      {hasOpenInterest && (
        <PriceView
          label="Open Interest"
          value={formatBigNumber(openInterest)}
        />
      )}
    </Wrapper>
  );
};

export default PriceBorder;

type AssetInfo = {
  volume24h: number; // 24h Volume
  last_price: number;
  price24h: number; // 24h price Change
  funding_rate: number; // 8h Funding
  // open_interest is an array of objects like [{Side: "POSITION_SIDE_LONG", MarketID: "1", OI: 10}, ...]
  open_interest: { Side: string; MarketID: string; OI: number }[];
};

const BASE_API = config.VITE_API_URL;

const useAssetInfo = () => {
  const { symbol } = useMarkets();

  const queryResult = useQuery({
    queryKey: ["assetInfo", symbol],
    queryFn: async (): Promise<AssetInfo> => {
      const res = await fetch(`${BASE_API}/other/asset_info?symbol=${symbol}`, {
        // credentials: "include",
      });
      const data = await res.json();
      return data;
    },
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    enabled: !!symbol,
  });

  return queryResult;
};

function formatBigNumber(strNumber: number | string) {
  const num = BigInt(parseInt(strNumber.toString()));
  if (num > 1_000_000_000_000_000_000n) {
    return `${num / 1_000_000_000_000_000_000n}Q`;
  }
  if (num > 1_000_000_000_000_000n) {
    return `${num / 1_000_000_000_000_000n}q`;
  }
  if (num > 1_000_000_000_000n) {
    return `${num / 1_000_000_000_000n}T`;
  }
  if (num > 1_000_000_000n) {
    return `${num / 1_000_000_000n}B`;
  }
  if (num > 1_000_000n) {
    return `${num / 1_000_000n}M`;
  }
  if (num > 1_000n) {
    return `${num / 1_000n}K`;
  }
  return Number(strNumber).toFixed(2);
}
