import styled from "styled-components";
import { Stack, Text } from "../../components";
import useTheme from "../../hooks/useTheme";
import { formatNumber } from "@/utils/format";
import SymbolSelect from "../../components/SymbolSelect/SymbolSelect";
import { useLocalStreaming } from "../chart/localStreaming";
import { useMarkets } from "@/hooks/useMarkets";
import { useQuery } from "react-query";
import config from "@/config";

const Wrapper = styled.div`
  background: linear-gradient(180deg, #16353c 0%, #17484e 100%);
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 24px;
  width: 100%;
  border-width: 1px 0px 1px 0px;
  border-style: solid;
  border-color: #2d5a62;
  margin-bottom: 12px;
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
}

const PriceView = ({
  label,
  value,
  type = ValueType.DEFAULT,
}: PriceViewParam) => {
  const { themeColors } = useTheme();
  const colorsByType = {
    [ValueType.ACTIVE]: themeColors.text.secondaryActive,
    [ValueType.ERROR]: themeColors.text.error,
    [ValueType.DEFAULT]: themeColors.text.primary,
  };
  return (
    <Stack>
      <Text color="tertiary">{label}</Text>
      <Text variant="textNumSm" color={colorsByType[type]}>
        {value}
      </Text>
    </Stack>
  );
};

const MainPrice = styled.div`
  min-width: 115px;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  ${({ theme }) => theme.fonts.fontStyles.monoRegular};
  color: ${({ theme }) => theme.colors.common.palette.secondary[600]};
`;
const MainPriceUnit = styled.span`
  display: inline-block;
  padding: 2px;
  opacity: 0.7;
`;

const PriceBorder = () => {
  const data = useLocalStreaming();
  const unit = "$";
  const price = data?.p ?? 0;

  const { data: assetInfo } = useAssetInfo();
  const volume = assetInfo?.volume24h ?? 0;
  const changeLastDay = assetInfo?.price24h ?? 0;
  const fundingRate = assetInfo?.funding_rate ?? 0.0001;

  return (
    <Wrapper>
      <SymbolSelect />
      <MainPrice>
        {data?.p && (
          <>
            <MainPriceUnit>{unit}</MainPriceUnit>
            {formatNumber({ value: +price })}
          </>
        )}
      </MainPrice>
      <PriceView
        label="Last Price"
        value={formatNumber({ value: +price, before: unit })}
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
        value={
          (changeLastDay > 0 ? "+" : "") +
          formatNumber({ value: changeLastDay, after: "%" })
        }
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
        // value={formatNumber({ value: 0.0032, after: "%" })}
        value={fundingRate + " %"}
        type={ValueType.ACTIVE}
      />
    </Wrapper>
  );
};

export default PriceBorder;

type AssetInfo = {
  volume24h: number; // 24h Volume
  price24h: number; // 24h price Change
  funding_rate: number; // 8h Funding
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
