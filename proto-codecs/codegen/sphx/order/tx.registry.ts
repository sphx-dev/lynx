//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgUpdateExecutionAuthority, MsgRegisterMarket, MsgPlaceOrder, MsgCancelOrder, MsgExecuteOrder } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/sphx.order.MsgUpdateParams", MsgUpdateParams], ["/sphx.order.MsgUpdateExecutionAuthority", MsgUpdateExecutionAuthority], ["/sphx.order.MsgRegisterMarket", MsgRegisterMarket], ["/sphx.order.MsgPlaceOrder", MsgPlaceOrder], ["/sphx.order.MsgCancelOrder", MsgCancelOrder], ["/sphx.order.MsgExecuteOrder", MsgExecuteOrder]];
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
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    updateExecutionAuthority(value: MsgUpdateExecutionAuthority) {
      return {
        typeUrl: "/sphx.order.MsgUpdateExecutionAuthority",
        value: MsgUpdateExecutionAuthority.encode(value).finish()
      };
    },
    registerMarket(value: MsgRegisterMarket) {
      return {
        typeUrl: "/sphx.order.MsgRegisterMarket",
        value: MsgRegisterMarket.encode(value).finish()
      };
    },
    placeOrder(value: MsgPlaceOrder) {
      return {
        typeUrl: "/sphx.order.MsgPlaceOrder",
        value: MsgPlaceOrder.encode(value).finish()
      };
    },
    cancelOrder(value: MsgCancelOrder) {
      return {
        typeUrl: "/sphx.order.MsgCancelOrder",
        value: MsgCancelOrder.encode(value).finish()
      };
    },
    executeOrder(value: MsgExecuteOrder) {
      return {
        typeUrl: "/sphx.order.MsgExecuteOrder",
        value: MsgExecuteOrder.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/sphx.order.MsgUpdateParams",
        value
      };
    },
    updateExecutionAuthority(value: MsgUpdateExecutionAuthority) {
      return {
        typeUrl: "/sphx.order.MsgUpdateExecutionAuthority",
        value
      };
    },
    registerMarket(value: MsgRegisterMarket) {
      return {
        typeUrl: "/sphx.order.MsgRegisterMarket",
        value
      };
    },
    placeOrder(value: MsgPlaceOrder) {
      return {
        typeUrl: "/sphx.order.MsgPlaceOrder",
        value
      };
    },
    cancelOrder(value: MsgCancelOrder) {
      return {
        typeUrl: "/sphx.order.MsgCancelOrder",
        value
      };
    },
    executeOrder(value: MsgExecuteOrder) {
      return {
        typeUrl: "/sphx.order.MsgExecuteOrder",
        value
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/sphx.order.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    updateExecutionAuthority(value: MsgUpdateExecutionAuthority) {
      return {
        typeUrl: "/sphx.order.MsgUpdateExecutionAuthority",
        value: MsgUpdateExecutionAuthority.fromPartial(value)
      };
    },
    registerMarket(value: MsgRegisterMarket) {
      return {
        typeUrl: "/sphx.order.MsgRegisterMarket",
        value: MsgRegisterMarket.fromPartial(value)
      };
    },
    placeOrder(value: MsgPlaceOrder) {
      return {
        typeUrl: "/sphx.order.MsgPlaceOrder",
        value: MsgPlaceOrder.fromPartial(value)
      };
    },
    cancelOrder(value: MsgCancelOrder) {
      return {
        typeUrl: "/sphx.order.MsgCancelOrder",
        value: MsgCancelOrder.fromPartial(value)
      };
    },
    executeOrder(value: MsgExecuteOrder) {
      return {
        typeUrl: "/sphx.order.MsgExecuteOrder",
        value: MsgExecuteOrder.fromPartial(value)
      };
    }
  }
};