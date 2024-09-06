//@ts-nocheck
import * as _14 from "./marginacc/genesis";
import * as _16 from "./marginacc/margin_account";
import * as _15 from "./marginacc/margin_account_asset";
import * as _17 from "./marginacc/params";
import * as _18 from "./marginacc/perpetual_position";
import * as _19 from "./marginacc/tx";
import * as _61 from "./marginacc/tx.amino";
import * as _63 from "./marginacc/tx.registry";
import * as _20 from "./order/genesis";
import * as _21 from "./order/order";
import * as _22 from "./order/params";
import * as _23 from "./order/tx";
import * as _62 from "./order/tx.amino";
import * as _64 from "./order/tx.registry";
import * as _24 from "./order/validated_order";
export namespace sphx {
  export const marginacc = {
    ..._14,
    ..._15,
    ..._16,
    ..._17,
    ..._18,
    ..._19,
    ..._61,
    ..._63,
  };
  export const order = {
    ..._20,
    ..._21,
    ..._22,
    ..._23,
    ..._24,
    ..._62,
    ..._64,
  };
}
