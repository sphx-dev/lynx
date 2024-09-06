//@ts-nocheck
import { MsgUpdateParams, MsgPlaceOrder } from "./tx";
export const AminoConverter = {
  "/sphx.order.MsgUpdateParams": {
    aminoType: "sphx/x/order/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/sphx.order.MsgPlaceOrder": {
    aminoType: "/sphx.order.MsgPlaceOrder",
    toAmino: MsgPlaceOrder.toAmino,
    fromAmino: MsgPlaceOrder.fromAmino
  }
};