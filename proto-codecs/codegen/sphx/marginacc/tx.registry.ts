//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgCreateMarginAccount } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/sphx.marginacc.MsgUpdateParams", MsgUpdateParams], ["/sphx.marginacc.MsgCreateMarginAccount", MsgCreateMarginAccount]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/sphx.marginacc.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    createMarginAccount(value: MsgCreateMarginAccount) {
      return {
        typeUrl: "/sphx.marginacc.MsgCreateMarginAccount",
        value: MsgCreateMarginAccount.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/sphx.marginacc.MsgUpdateParams",
        value
      };
    },
    createMarginAccount(value: MsgCreateMarginAccount) {
      return {
        typeUrl: "/sphx.marginacc.MsgCreateMarginAccount",
        value
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/sphx.marginacc.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    createMarginAccount(value: MsgCreateMarginAccount) {
      return {
        typeUrl: "/sphx.marginacc.MsgCreateMarginAccount",
        value: MsgCreateMarginAccount.fromPartial(value)
      };
    }
  }
};