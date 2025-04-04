import { Table } from "../../../components";
import PlaceHolder from "../PlaceHolder";

import { useChainCosmoshub } from "../../../hooks/useChainCosmoshub";
import { useCallback, useState } from "react";
import { Pagination } from "@/components/Pagination";
import { OrderType } from "proto-codecs/codegen/sphx/order/order";
import { PerpetualPosition } from "proto-codecs/codegen/sphx/order/perpetual_position";
import { ClosePositionByMarketModal } from "./ClosePositionByMarket";
import { ClosePositionByLimitModal } from "./ClosePositionByLimit";
import { ShowTpSlModal } from "./ShowTpSlModal";
import { ReloadButton } from "../components/ReloadButton";
import { LoaderBar } from "@/components/LoaderBar";
import { ModalPositionDetails } from "./usePositionDetailsColumns";
import { usePositionColumnsV2 } from "./usePositionColumnsV2";
import { useQueryPositionsByAccount } from "@/hooks/usePositions";

const Positions = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | undefined>();
  const { isConnected, address } = useChainCosmoshub();

  // const { data, refetch, isFetching } = usePositions();

  // const positions = useMemo(() => {
  //   // TODO: Filter out closed positions by call params when implemented in chain
  //   return (data?.positions || []).filter(
  //     (pos) => pos.status === PositionStatus.POSITION_STATUS_OPEN
  //   );
  // }, [data]);

  // TODO: Update query from chain to positions from osiris
  const {
    data: positions,
    refetch,
    isFetching,
  } = useQueryPositionsByAccount(address);

  const [page, setPage] = useState(0);
  // const pagination = data?.pagination || { total: 0 };
  const pagination = { total: 0 };

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

  const queryDetails = useCallback((symbol: string) => {
    console.log("TODO: query details", symbol);
    setSelectedSymbol(symbol);
    setIsDetailsOpen(true);
  }, []);

  const positionColumns = usePositionColumnsV2(
    closePosition,
    showTpSl,
    queryDetails
  );

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const setDetailsClose = useCallback(() => {
    setIsDetailsOpen(false);
  }, [setIsDetailsOpen]);

  if (!positions?.length || !isConnected) {
    return (
      <>
        <LoaderBar style={{ visibility: isFetching ? "visible" : "hidden" }} />
        <ReloadButton
          onClick={() => {
            refetch();
            // TODO: Update query from chain to positions from osiris
            // refetchPositionsByAccount();
          }}
        />
        <PlaceHolder data-testid="perpetual-positions-table-empty">
          No Positions
        </PlaceHolder>
      </>
    );
  }
  return (
    <>
      <LoaderBar style={{ visibility: isFetching ? "visible" : "hidden" }} />
      <ModalPositionDetails
        isOpen={isDetailsOpen}
        onClose={setDetailsClose}
        accountId={address}
        symbol={selectedSymbol}
      />
      <ReloadButton
        onClick={() => {
          refetch();
          // TODO: Update query from chain to positions from osiris
          // refetchPositionsByAccount();
        }}
      />
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
