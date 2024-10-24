import { Button } from "@/components";
import { Input } from "@/components/Input";
// import { BigIntInput } from "@/components/Input/BigIntInput";
import { Modal } from "@/components/Modal/Modal";
import { useChainCosmoshub } from "@/hooks/useChainCosmoshub";
import { useMarkets } from "@/hooks/useMarkets";
import { useCreateOrder } from "@/hooks/useOrders";
import { errorAlert, successAlert } from "@/utils/alerts";
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
  size: number;
};

// Receives a position as parameter and display a modal form to create an new market order to close the position
export const ClosePositionByMarketModal = ({
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
        size: Number(position.size) / 1e6,
      },
      resolver: yupResolver(
        yup.object().shape({
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

  const { placeMarketOrder, marketStatus } = useCreateOrder();
  const closePosition = useCallback(
    (values: ClosePositionFromProps) => {
      placeMarketOrder({
        address: address!,
        marginAccountAddress: position.marginAccount,
        marketId: position.marketId,
        orderId: BigInt(Date.now() * 1000),
        side:
          position.side === PositionSide.POSITION_SIDE_LONG
            ? OrderSide.ORDER_SIDE_SELL
            : OrderSide.ORDER_SIDE_BUY,
        quantity: BigInt(Number(values.size) * 1e6),
        leverage: position.leverage,
        onSuccess: msg => {
          successAlert(msg);
          onClose();
        },
        onError: msg => {
          errorAlert(msg);
        },
      });
    },
    [placeMarketOrder, position, address, onClose]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      data-testid="close-position-by-market-modal"
    >
      <div style={{ minWidth: "400px" }}>
        <form onSubmit={handleSubmit(closePosition)}>
          <h1>Close By Market</h1>

          <h5 style={{ margin: "19px 0 10px 0" }}>Close Quantity</h5>
          <SliderButtonWrapper>
            <Button
              size="xs"
              type="button"
              onClick={() => setValue("size", Number(position.size) / 4 / 1e6)}
            >
              25%
            </Button>
            <Button
              size="xs"
              type="button"
              onClick={() => setValue("size", Number(position.size) / 2 / 1e6)}
            >
              50%
            </Button>
            <Button
              size="xs"
              type="button"
              onClick={() =>
                setValue("size", ((Number(position.size) / 4) * 3) / 1e6)
              }
            >
              75%
            </Button>
            <Button
              size="xs"
              type="button"
              onClick={() => setValue("size", Number(position.size) / 1e6)}
            >
              100%
            </Button>
          </SliderButtonWrapper>

          <Input
            placeholder="Qty"
            rightSide={market?.baseAsset}
            {...register("size")}
            defaultValue={watch("size")}
          />
          <ButtonWrapper>
            <Button
              size="lg"
              onClick={() => onClose()}
              disabled={marketStatus.isLoading}
            >
              {t("cancel")}
            </Button>
            <Button
              size="lg"
              variant="primary"
              type="submit"
              data-testid="confirm-button"
              disabled={marketStatus.isLoading}
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
