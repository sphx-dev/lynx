//@ts-nocheck
import { Rpc } from "../helpers";
export const createRPCMsgClient = async ({
  rpc
}: {
  rpc: Rpc;
}) => ({
  sphx: {
    marginacc: new (await import("./marginacc/tx.rpc.msg")).MsgClientImpl(rpc),
    order: new (await import("./order/tx.rpc.msg")).MsgClientImpl(rpc)
  },
  cosmos: {
    bank: {
      v1beta1: new (await import("../cosmos/bank/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    staking: {
      v1beta1: new (await import("../cosmos/staking/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    upgrade: {
      v1beta1: new (await import("../cosmos/upgrade/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    }
  }
});