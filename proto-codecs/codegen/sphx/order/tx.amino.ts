//@ts-nocheck
import { MsgUpdateParams, MsgUpdateExecutionAuthority, MsgRegisterMarket, MsgPlaceOrder, MsgCancelOrder, MsgExecuteOrder } from "./tx";
export const AminoConverter = {
  "/sphx.order.MsgUpdateParams": {
    aminoType: "sphx/x/order/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/sphx.order.MsgUpdateExecutionAuthority": {
    aminoType: "/sphx.order.MsgUpdateExecutionAuthority",
    toAmino: MsgUpdateExecutionAuthority.toAmino,
    fromAmino: MsgUpdateExecutionAuthority.fromAmino
  },
  "/sphx.order.MsgRegisterMarket": {
    aminoType: "/sphx.order.MsgRegisterMarket",
    toAmino: MsgRegisterMarket.toAmino,
    fromAmino: MsgRegisterMarket.fromAmino
  },
  "/sphx.order.MsgPlaceOrder": {
    aminoType: "/sphx.order.MsgPlaceOrder",
    toAmino: MsgPlaceOrder.toAmino,
    fromAmino: MsgPlaceOrder.fromAmino
  },
  "/sphx.order.MsgCancelOrder": {
    aminoType: "/sphx.order.MsgCancelOrder",
    toAmino: MsgCancelOrder.toAmino,
    fromAmino: MsgCancelOrder.fromAmino
  },
  "/sphx.order.MsgExecuteOrder": {
    aminoType: "/sphx.order.MsgExecuteOrder",
    toAmino: MsgExecuteOrder.toAmino,
    fromAmino: MsgExecuteOrder.fromAmino
  }
};