//@ts-nocheck
import * as _18 from "./marginacc/genesis";
import * as _19 from "./marginacc/margin_account_asset";
import * as _20 from "./marginacc/margin_account";
import * as _21 from "./marginacc/params";
import * as _22 from "./marginacc/query";
import * as _23 from "./marginacc/tx";
import * as _24 from "./order/genesis";
import * as _25 from "./order/market";
import * as _26 from "./order/order";
import * as _27 from "./order/params";
import * as _28 from "./order/perpetual_position";
import * as _29 from "./order/query";
import * as _30 from "./order/tx";
import * as _31 from "./order/validated_order";
import * as _73 from "./marginacc/tx.amino";
import * as _74 from "./order/tx.amino";
import * as _75 from "./marginacc/tx.registry";
import * as _76 from "./order/tx.registry";
import * as _77 from "./marginacc/query.lcd";
import * as _78 from "./order/query.lcd";
import * as _79 from "./marginacc/query.rpc.Query";
import * as _80 from "./order/query.rpc.Query";
import * as _81 from "./marginacc/tx.rpc.msg";
import * as _82 from "./order/tx.rpc.msg";
import * as _96 from "./lcd";
import * as _97 from "./rpc.query";
import * as _98 from "./rpc.tx";
export namespace sphx {
  export const marginacc = {
    ..._18,
    ..._19,
    ..._20,
    ..._21,
    ..._22,
    ..._23,
    ..._73,
    ..._75,
    ..._77,
    ..._79,
    ..._81
  };
  export const order = {
    ..._24,
    ..._25,
    ..._26,
    ..._27,
    ..._28,
    ..._29,
    ..._30,
    ..._31,
    ..._74,
    ..._76,
    ..._78,
    ..._80,
    ..._82
  };
  export const ClientFactory = {
    ..._96,
    ..._97,
    ..._98
  };
}