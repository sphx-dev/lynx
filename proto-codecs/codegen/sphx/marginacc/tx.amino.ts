//@ts-nocheck
import { MsgCreateMarginAccount, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/sphx.marginacc.MsgUpdateParams": {
    aminoType: "sphx/x/marginacc/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino,
  },
  "/sphx.marginacc.MsgCreateMarginAccount": {
    aminoType: "marginacc/MsgCreateMarginAccount",
    toAmino: MsgCreateMarginAccount.toAmino,
    fromAmino: MsgCreateMarginAccount.fromAmino,
  },
};
