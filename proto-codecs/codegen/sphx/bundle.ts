//@ts-nocheck
import * as _18 from "./marginacc/genesis";
import * as _19 from "./marginacc/margin_account_asset";
import * as _20 from "./marginacc/margin_account";
import * as _21 from "./marginacc/params";
import * as _22 from "./marginacc/perpetual_position";
import * as _23 from "./marginacc/query";
import * as _24 from "./marginacc/tx";
import * as _25 from "./order/genesis";
import * as _26 from "./order/order";
import * as _27 from "./order/params";
import * as _28 from "./order/query";
import * as _29 from "./order/tx";
import * as _30 from "./order/validated_order";
import * as _67 from "./marginacc/tx.amino";
import * as _68 from "./order/tx.amino";
import * as _69 from "./marginacc/tx.registry";
import * as _70 from "./order/tx.registry";
export namespace sphx {
  export const marginacc = {
    ..._18,
    ..._19,
    ..._20,
    ..._21,
    ..._22,
    ..._23,
    ..._24,
    ..._67,
    ..._69
  };
  export const order = {
    ..._25,
    ..._26,
    ..._27,
    ..._28,
    ..._29,
    ..._30,
    ..._68,
    ..._70
  };
}