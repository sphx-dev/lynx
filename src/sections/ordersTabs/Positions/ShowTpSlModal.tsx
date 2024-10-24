import { Button, Table, Text } from "@/components";
import { Modal } from "@/components/Modal/Modal";
import { useCancelOrder, useOrdersById } from "@/hooks/useOrders";
import dayjs from "dayjs";
import { PerpetualPosition } from "proto-codecs/codegen/sphx/order/perpetual_position";
import { useTranslation } from "react-i18next";
import { getOrderTypeText } from "../helpers";
import { formatPrice } from "@/utils/format";
import { OrderStatus } from "proto-codecs/codegen/sphx/order/validated_order";
import { OrderId } from "proto-codecs/codegen/sphx/order/order";

export const ShowTpSlModal = ({
  position,
  isOpen,
  onClose,
}: {
  position: PerpetualPosition;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();

  // const tpOrderId = {
  //   marginAccountAddress:
  //     "sphx1lq84nramxat95telfu97y046f408wgjavgshjrquz7ycmaness8s0mnejk",
  //   number: 1727429142081001n,
  // };
  // const slOrderId = {
  //   marginAccountAddress:
  //     "sphx1lq84nramxat95telfu97y046f408wgjavgshjrquz7ycmaness8s0mnejk",
  //   number: 1727429142081002n,
  // };

  const tpOrderId = position.tpOrderId;
  const slOrderId = position.slOrderId;

  const resultsTp = useOrdersById([tpOrderId]);
  const resultsSl = useOrdersById([slOrderId]);
  const dataTp = resultsTp
    .map(r => r.data)
    .filter(d => !!d)
    .map(d => ({ ...d, type: "TP" }));
  const dataSl = resultsSl
    .map(r => r.data)
    .filter(d => !!d)
    .map(d => ({ ...d, type: "SL" }));

  let data = [...dataTp, ...dataSl].toSorted((a, b) => {
    return Number(a.timestamp! - b.timestamp!);
  });
  console.log("data TP SL", dataTp, dataSl);
  console.log("data", data);

  const { cancelOrder } = useCancelOrder();
  const columns = useTpSlColumns(cancelOrder);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h1>{t("tp_sl_title")}</h1>

        {data.length > 0 && <Table columns={columns} data={data} />}
      </div>
    </Modal>
  );
};

const useTpSlColumns = (
  cancelOrder: (params: {
    address: string;
    orderId: OrderId;
    memo: string;
  }) => void
) => {
  const { t } = useTranslation();
  return [
    {
      header: t("#"),
      accessorFn: (row: any, index: number) => {
        return index + 1;
      },
      cell: (props: any) => <Text>{props.getValue()}</Text>,
    },
    {
      header: t("id"),
      accessorKey: "id",
      cell: (props: any) => <Text>{props.getValue().number.toString()}</Text>,
    },
    {
      header: t("type"),
      accessorKey: "type",
      cell: (props: any) => (
        <Text color={props.getValue() === "TP" ? "buy" : "sell"}>
          {props.getValue()}
        </Text>
      ),
    },
    {
      header: t("quantity"),
      accessorKey: "quantity",
      cell: (props: any) => (
        <Text>{formatPrice(Number(props.getValue()) / 1e6)}</Text>
      ),
    },
    {
      header: t("trigger_price"),
      accessorKey: "triggerPrice",
      cell: (props: any) => (
        <Text>{formatPrice(Number(props.getValue()) / 1e6, 2)}</Text>
      ),
    },
    {
      header: t("order_type"),
      accessorKey: "orderType",
      cell: (props: any) => (
        <Text color="secondaryLink">
          {getOrderTypeText(props.getValue(), t)}
        </Text>
      ),
    },
    {
      header: t("order_time"),
      accessorKey: "timestamp",
      cell: (props: any) => (
        <Text>
          {dayjs(new Date(Number(props.getValue()) * 1000)).format(
            "YYYY-MM-DD HH:mm:ss"
          )}
        </Text>
      ),
    },
    {
      header: t("action"),
      accessorFn: (row: any) => {
        return row;
      },
      cell: (props: any) => {
        const status = props.getValue()?.status;
        const address = props.getValue()?.accountId;
        const orderId = props.getValue()?.id;
        return (
          <>
            {status === OrderStatus.ORDER_STATUS_OPEN && (
              <Button
                variant="link"
                size="xs"
                onClick={() =>
                  cancelOrder({
                    address,
                    orderId,
                    memo: `Cancel order #${orderId.number}`,
                  })
                }
              >
                Cancel
              </Button>
            )}
          </>
        );
      },
    },
  ];
};
