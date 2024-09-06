//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";

import { MsgPlaceOrder, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [
  ["/sphx.order.MsgUpdateParams", MsgUpdateParams],
  ["/sphx.order.MsgPlaceOrder", MsgPlaceOrder],
];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/sphx.order.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish(),
      };
    },
    placeOrder(value: MsgPlaceOrder) {
      return {
        typeUrl: "/sphx.order.MsgPlaceOrder",
        value: MsgPlaceOrder.encode(value).finish(),
      };
    },
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/sphx.order.MsgUpdateParams",
        value,
      };
    },
    placeOrder(value: MsgPlaceOrder) {
      return {
        typeUrl: "/sphx.order.MsgPlaceOrder",
        value,
      };
    },
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/sphx.order.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value),
      };
    },
    placeOrder(value: MsgPlaceOrder) {
      return {
        typeUrl: "/sphx.order.MsgPlaceOrder",
        value: MsgPlaceOrder.fromPartial(value),
      };
    },
  },
};
