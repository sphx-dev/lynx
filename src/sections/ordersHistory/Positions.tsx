import { Table } from "../../components";
import PlaceHolder from "./PlaceHolder";

import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { usePositionColumns } from "./usePositionColumns";
import { useCallback, useState } from "react";
import { usePositions } from "@/hooks/usePositions";
import { Pagination } from "@/components/Pagination";
import { OrderSide, OrderType } from "proto-codecs/codegen/sphx/order/order";

const Positions = () => {
  const { isConnected } = useChainCosmoshub();

  const closePosition = useCallback(
    ({
      size,
      side,
      type,
      leverage,
    }: {
      size: string;
      side: OrderSide;
      type: OrderType;
      leverage: number;
    }) => {
      console.log("TODO: close position", size, side, type, leverage);
    },
    []
  );

  const { data } = usePositions();
  const positions = data?.positions || [];

  const [page, setPage] = useState(0);
  const pagination = data?.pagination || { total: 0 };

  const positionColumns = usePositionColumns(closePosition);

  if (!positions.length || !isConnected) {
    return (
      <PlaceHolder data-test="order-history-positions">
        No Positions
      </PlaceHolder>
    );
  }
  return (
    <>
      <Table
        data-test="order-history-positions"
        columns={positionColumns}
        data={positions}
      />
      <Pagination
        page={page}
        setPage={setPage}
        totalItems={Number(pagination?.total) || 0}
        pageSize={10}
      />
    </>
  );
};

export default Positions;
