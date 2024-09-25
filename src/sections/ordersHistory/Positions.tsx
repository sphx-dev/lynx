import { Table } from "../../components";
import PlaceHolder from "./PlaceHolder";

import { usePlaceMarketOrderMutation } from "../../utils/api/orderApi";
import { OrderSide, OrderType } from "../../types/order";
import { useGetAccountQuery } from "../../utils/api/accountApi";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { usePositionColumnsByOrders } from "./usePositionColumns";
import { useCallback, useEffect, useState } from "react";
import { getPerpetualPositionsByAddress } from "../../utils/queryPerpetualPositions";

const Positions = () => {
  // const { positions } = useAppSelector(account);
  // const [positions, setPositions] = useState<ValidatedOrder[]>([]);
  const { isConnected } = useChainCosmoshub();

  const [placeMarketOrder] = usePlaceMarketOrderMutation();

  useGetAccountQuery(undefined, {
    // pollingInterval: 5000,
    pollingInterval: 0,
    skip: !isConnected,
  });

  const closePosition = useCallback(
    ({
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
    },
    [placeMarketOrder]
  );

  const { address } = useChainCosmoshub();
  const [positions, setPositions] = useState<any[]>([]);
  useEffect(() => {
    if (address) {
      getPerpetualPositionsByAddress(address).then(response => {
        console.log("response", response);
        setPositions(response.positions);
      });
    }
  }, [address]);

  const positionColumns = usePositionColumnsByOrders(closePosition);

  if (!positions.length || !isConnected) {
    return (
      <PlaceHolder data-test="order-history-positions">
        No Orders yet
      </PlaceHolder>
    );
  }
  return (
    <Table
      data-test="order-history-positions"
      columns={positionColumns}
      data={positions}
    />
  );
};

export default Positions;
