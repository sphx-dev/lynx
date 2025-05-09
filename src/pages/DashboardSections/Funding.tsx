import { useCallback, useEffect, useState } from "react";
import { useChainCosmoshub } from "@/hooks/useChainCosmoshub";
import { useMarginAccount } from "@/hooks/useMarginAccounts";
import { useMarkets } from "@/hooks/useMarkets";
import DatePicker from "@/components/ReactDatepickerCustom/DatePicker";
import { Divider, Table, Text } from "@/components";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import styled from "styled-components";
import SymbolSelect from "@/components/SymbolSelect/SymbolSelect";
import { useFundingRateColumns } from "./useFundingRateColumns";
import { fetchFundingRateLogs } from "./useFundingRate";
import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ButtonV2/Button";

export const Funding = () => {
  const { t } = useTranslation();
  const { address, isConnected } = useChainCosmoshub();
  const { selectedAddress } = useMarginAccount(address);
  const { selectedMarket } = useMarkets();

  const [fromDate, setFromDate] = useState<Date | null>(
    dayjs(Date.now()).subtract(1, "month").toDate()
  );
  const [toDate, setToDate] = useState<Date | null>(new Date());

  const [data, setData] = useState(null);
  const onSubmit = useCallback(async () => {
    if (
      !isConnected ||
      !selectedAddress ||
      !selectedMarket?.ticker ||
      !fromDate ||
      !toDate
    ) {
      return;
    }

    const data = await fetchFundingRateLogs(
      selectedAddress!,
      selectedMarket?.ticker,
      Math.floor(dayjs(fromDate).startOf("day").toDate().getTime() / 1000),
      Math.floor(
        dayjs(toDate).endOf("day").toDate().getTime() + (24 * 60) / 1000
      )
    );
    setData(data);
  }, [isConnected, selectedAddress, selectedMarket, fromDate, toDate]);

  useEffect(() => {
    if (!Boolean(selectedAddress)) {
      setData(null);
    } else {
      onSubmit();
    }
  }, [selectedAddress, setData, onSubmit]);

  const loadButtonDisabled =
    !isConnected ||
    !selectedAddress ||
    !selectedMarket?.ticker ||
    !fromDate ||
    !toDate;

  return (
    <div>
      <Text as="h2" variant="textLarge">
        {t("fundingRateLogs")}
      </Text>

      <div
        style={{
          display: "flex",
          gap: "18px",
          paddingTop: "22px",
          alignItems: "center",
        }}
      >
        <SymbolSelect />
        <DatePickerContainer>
          <DatePickerLabel>{t("From")}:</DatePickerLabel>
          <DatePicker
            onChange={date => {
              // setTimeout fixes interblocking issue with selected
              setTimeout(() => setFromDate(date), 100);
            }}
            selected={fromDate}
            dateFormat="yyyy/MM/dd"
          />
        </DatePickerContainer>
        <DatePickerContainer>
          <DatePickerLabel>{t("To")}:</DatePickerLabel>
          <DatePicker
            onChange={date => {
              // setTimeout fixes interblocking issue with selected
              setTimeout(() => setToDate(date), 100);
            }}
            selected={toDate}
            dateFormat="yyyy/MM/dd"
          />
        </DatePickerContainer>
        <Button onClick={onSubmit} disabled={loadButtonDisabled} size="small">
          Load
        </Button>
      </div>

      <Divider style={{ margin: "1rem" }} />

      {!data ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            height: "200px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              gap: "1rem",
            }}
          >
            {!isConnected ? (
              t("conectWalletToViewFundingRateLogs")
            ) : (
              <>
                {t("selectRageToLoadData")}
                <Button onClick={onSubmit}>Load</Button>
              </>
            )}
          </div>
        </div>
      ) : (
        <FundingRateTable data={data} />
      )}
    </div>
  );
};

const PAGE_SIZE = 15;
const FundingRateTable = ({ data }: { data: any[] }) => {
  const columns = useFundingRateColumns();

  const [page, setPage] = useState(0);
  const pageData = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <>
      <div style={{ minHeight: "530px" }}>
        <Table columns={columns} data={pageData}></Table>
      </div>
      <Pagination
        totalItems={data.length}
        page={page}
        setPage={setPage}
        pageSize={PAGE_SIZE}
      />
    </>
  );
};

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-start;
  margin-top: -22px;
`;

const DatePickerLabel = styled.label`
  font-family: var(--text-small-font-family);
  font-size: var(--text-small-font-size);
  font-weight: var(--text-small-font-weight);
  line-height: var(--text-small-line-height);

  color: #ffffff;
  text-align: left;
`;
