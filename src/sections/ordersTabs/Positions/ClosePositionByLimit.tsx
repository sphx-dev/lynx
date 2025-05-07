import { Button } from "@/components/ButtonV2/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal/Modal";
import { promiseAlert } from "@/components/Toast/Toast";
import { PRECISION } from "@/constants";
import { useChainCosmoshub } from "@/hooks/useChainCosmoshub";
import { useMarkets } from "@/hooks/useMarkets";
import { useCreateOrder } from "@/hooks/useOrders";
import { yupResolver } from "@hookform/resolvers/yup";
import { OrderSide } from "proto-codecs/codegen/sphx/order/order";
import {
  PerpetualPosition,
  PositionSide,
} from "proto-codecs/codegen/sphx/order/perpetual_position";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import * as yup from "yup";

type ClosePositionFromProps = {
  price: number;
  size: number;
};

// Receives a position as parameter and display a modal form to create an new market order to close the position
export const ClosePositionByLimitModal = ({
  position,
  isOpen,
  onClose,
}: {
  position: PerpetualPosition;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const { address } = useChainCosmoshub();
  const { markets } = useMarkets();
  const market = markets.find(m => m.id === position.marketId);

  const { handleSubmit, setValue, register, watch } =
    useForm<ClosePositionFromProps>({
      defaultValues: {
        size: Number(position.size) / PRECISION,
      },
      resolver: yupResolver(
        yup.object().shape({
          price: yup
            .number()
            .required("Price is required")
            .min(0, "Price must be greater than 0"),
          size: yup
            .number()
            .required("Size is required")
            .min(0, "Size must be greater than 0")
            .max(
              Number(position.size),
              "Size must be less than or equal to position size"
            ),
        })
      ),
    });

  const { placeLimitOrder, limitStatus } = useCreateOrder();
  const closePosition = useCallback(
    (values: ClosePositionFromProps) => {
      promiseAlert(
        placeLimitOrder({
          address: address!,
          marginAccountAddress: position.marginAccount,
          marketId: position.marketId,
          orderId: BigInt(Date.now() * 1000),
          side:
            position.side === PositionSide.POSITION_SIDE_LONG
              ? OrderSide.ORDER_SIDE_SELL
              : OrderSide.ORDER_SIDE_BUY,
          quantity: BigInt((Number(values.size) * PRECISION).toFixed(0)),
          price: BigInt((Number(values.price) * PRECISION).toFixed(0)),
          leverage: position.leverage,
          // onSuccess: (msg) => {
          //   successAlert(msg);
          // },
          // onError: (msg) => {
          //   errorAlert(msg);
          // },
        }).then(() => {
          onClose();
        }),
        {
          pending: t("waitingForApproval"),
          success: t("orderPlacedSuccess"),
          error: t("errorPlacingOrder"),
        }
        // <div>{t("waitingForApproval")}</div>,
        // () => <div>{t("orderPlacedSuccess")}</div>,
        // (txt: string) => <div>{txt}</div>
      );
    },
    [placeLimitOrder, position, address, onClose, t]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={{ minWidth: "400px" }}>
        <form onSubmit={handleSubmit(closePosition)}>
          <h1>Close By Limit</h1>

          <h5 style={{ margin: "19px 0 10px 0" }}>Close Price</h5>
          <Input
            data-testid="input-price"
            placeholder="0.00"
            rightSide={market?.quoteAsset}
            {...register("price")}
            defaultValue={watch("price") || ""}
          />

          <h5 style={{ margin: "19px 0 10px 0" }}>Close Quantity</h5>
          <SliderButtonWrapper>
            <Button
              size="xxsmall"
              onClick={() =>
                setValue("size", Number(position.size) / 4 / PRECISION)
              }
            >
              25%
            </Button>
            <Button
              size="xxsmall"
              onClick={() =>
                setValue("size", Number(position.size) / 2 / PRECISION)
              }
            >
              50%
            </Button>
            <Button
              size="xxsmall"
              onClick={() =>
                setValue("size", ((Number(position.size) / 4) * 3) / PRECISION)
              }
            >
              75%
            </Button>
            <Button
              size="xxsmall"
              onClick={() =>
                setValue("size", Number(position.size) / PRECISION)
              }
            >
              100%
            </Button>
          </SliderButtonWrapper>

          <Input
            data-testid="input-size"
            placeholder="Qty"
            rightSide={market?.baseAsset}
            {...register("size")}
            defaultValue={watch("size") || ""}
          />
          <ButtonWrapper>
            <Button
              size="small"
              onClick={() => onClose()}
              disabled={limitStatus.isLoading}
            >
              {t("cancel")}
            </Button>
            <Button
              size="small"
              htmlType="submit"
              disabled={limitStatus.isLoading}
            >
              {t("confirm")}
            </Button>
          </ButtonWrapper>
        </form>
      </div>
    </Modal>
  );
};

const SliderButtonWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 28px;
  align-items: center;
  justify-content: center;
`;
