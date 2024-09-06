import { Table } from "../../components";
import { useAppSelector } from "../../hooks";
import { account } from "../../state/accountSlice";
import PlaceHolder from "./PlaceHolder";

import { usePlaceMarketOrderMutation } from "../../utils/api/orderApi";
import { OrderSide, OrderType } from "../../types/order";
import { useGetAccountQuery } from "../../utils/api/accountApi";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { usePositionColumns } from "./usePositionColumns";

const Positions = () => {
  const { positions } = useAppSelector(account);
  const { isConnected } = useChainCosmoshub();

  const [placeMarketOrder] = usePlaceMarketOrderMutation();

  useGetAccountQuery(undefined, {
    // pollingInterval: 5000,
    pollingInterval: 0,
    skip: !isConnected,
  });

  const closePosition = ({
    size,
    side,
    leverage,
  }: {
    size: string;
    side: OrderSide;
    leverage: number;
  }) => {
    placeMarketOrder({
      isBuy: side !== OrderSide.buy,
      volume: Math.abs(+size),
      leverage: leverage || 1,
      orderType: OrderType.MARKET,
    });
  };

  const positionColumns = usePositionColumns(closePosition);

  if (!positions.length || !isConnected) {
    return <PlaceHolder>No Orders yet</PlaceHolder>;
  }
  return <Table columns={positionColumns} data={positions} />;
};

export default Positions;
