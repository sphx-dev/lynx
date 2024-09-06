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
import * as _72 from "./marginacc/tx.amino";
import * as _73 from "./order/tx.amino";
import * as _74 from "./marginacc/tx.registry";
import * as _75 from "./order/tx.registry";
import * as _76 from "./marginacc/query.lcd";
import * as _77 from "./order/query.lcd";
import * as _78 from "./marginacc/query.rpc.Query";
import * as _79 from "./order/query.rpc.Query";
import * as _80 from "./marginacc/tx.rpc.msg";
import * as _81 from "./order/tx.rpc.msg";
import * as _95 from "./lcd";
import * as _96 from "./rpc.query";
import * as _97 from "./rpc.tx";
export namespace sphx {
  export const marginacc = {
    ..._18,
    ..._19,
    ..._20,
    ..._21,
    ..._22,
    ..._23,
    ..._24,
    ..._72,
    ..._74,
    ..._76,
    ..._78,
    ..._80
  };
  export const order = {
    ..._25,
    ..._26,
    ..._27,
    ..._28,
    ..._29,
    ..._30,
    ..._73,
    ..._75,
    ..._77,
    ..._79,
    ..._81
  };
  export const ClientFactory = {
    ..._95,
    ..._96,
    ..._97
  };
}