import { Table } from "../../../components";
import PlaceHolder from "../PlaceHolder";

import { useChainCosmoshub } from "../../../hooks/useChainCosmoshub";
import { usePositionColumns } from "./usePositionColumns";
import { useCallback, useMemo, useState } from "react";
import { usePositions } from "@/hooks/usePositions";
import { Pagination } from "@/components/Pagination";
import { OrderType } from "proto-codecs/codegen/sphx/order/order";
import {
  PerpetualPosition,
  PositionStatus,
} from "proto-codecs/codegen/sphx/order/perpetual_position";
import { ClosePositionByMarketModal } from "./ClosePositionByMarket";
import { ClosePositionByLimitModal } from "./ClosePositionByLimit";
import { ShowTpSlModal } from "./ShowTpSlModal";

const Positions = () => {
  const { isConnected } = useChainCosmoshub();

  const { data } = usePositions();
  console.log("positions raw", data?.positions);
  const positions = useMemo(() => {
    // TODO: Filter out closed positions by call params when implemented in chain
    return (data?.positions || []).filter(
      pos => pos.status === PositionStatus.POSITION_STATUS_OPEN
    );
  }, [data]);

  const [page, setPage] = useState(0);
  const pagination = data?.pagination || { total: 0 };

  const [closePositionByMarketModal, setClosePositionByMarketModal] =
    useState(false);
  const [closePositionByLimitModal, setClosePositionByLimitModal] =
    useState(false);
  const [positionToClose, setPositionToClose] =
    useState<PerpetualPosition | null>(null);

  const closePosition = useCallback(
    (type: OrderType, position: PerpetualPosition) => {
      if (type === OrderType.ORDER_TYPE_LIMIT) {
        setClosePositionByLimitModal(true);
        setPositionToClose(position);
      } else {
        setClosePositionByMarketModal(true);
        setPositionToClose(position);
      }
    },
    []
  );

  const [showTpSlModal, setShowTpSlModal] = useState(false);
  const [positionToShowTpSl, setPositionToShowTpSl] =
    useState<PerpetualPosition | null>(null);
  const showTpSl = useCallback((position: PerpetualPosition) => {
    console.log("TODO: show TP/SL", position);
    setPositionToShowTpSl(position);
    setShowTpSlModal(true);
  }, []);

  const positionColumns = usePositionColumns(closePosition, showTpSl);
  // console.log("positions", positions);
  if (!positions?.length || !isConnected) {
    return (
      <PlaceHolder data-testid="perpetual-positions-table-empty">
        No Positions
      </PlaceHolder>
    );
  }
  return (
    <>
      <Table
        data-testid="perpetual-positions-table"
        columns={positionColumns}
        data={positions}
      />
      <Pagination
        page={page}
        setPage={setPage}
        totalItems={Number(pagination?.total) || 0}
        pageSize={10}
      />
      {closePositionByMarketModal && positionToClose && (
        <ClosePositionByMarketModal
          position={positionToClose}
          isOpen={closePositionByMarketModal}
          onClose={() => setClosePositionByMarketModal(false)}
        />
      )}
      {closePositionByLimitModal && positionToClose && (
        <ClosePositionByLimitModal
          position={positionToClose}
          isOpen={closePositionByLimitModal}
          onClose={() => setClosePositionByLimitModal(false)}
        />
      )}
      {showTpSlModal && positionToShowTpSl && (
        <ShowTpSlModal
          position={positionToShowTpSl}
          isOpen={showTpSlModal}
          onClose={() => setShowTpSlModal(false)}
        />
      )}
    </>
  );
};

export default Positions;
