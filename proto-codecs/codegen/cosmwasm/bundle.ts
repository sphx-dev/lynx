//@ts-nocheck
import * as _11 from "./wasm/v1/authz";
import * as _12 from "./wasm/v1/genesis";
import * as _13 from "./wasm/v1/ibc";
import * as _14 from "./wasm/v1/proposal_legacy";
import * as _15 from "./wasm/v1/query";
import * as _16 from "./wasm/v1/tx";
import * as _17 from "./wasm/v1/types";
import * as _67 from "./wasm/v1/tx.amino";
import * as _68 from "./wasm/v1/tx.registry";
import * as _69 from "./wasm/v1/query.lcd";
import * as _70 from "./wasm/v1/query.rpc.Query";
import * as _71 from "./wasm/v1/tx.rpc.msg";
import * as _92 from "./lcd";
import * as _93 from "./rpc.query";
import * as _94 from "./rpc.tx";
export namespace cosmwasm {
  export namespace wasm {
    export const v1 = {
      ..._11,
      ..._12,
      ..._13,
      ..._14,
      ..._15,
      ..._16,
      ..._17,
      ..._67,
      ..._68,
      ..._69,
      ..._70,
      ..._71
    };
  }
  export const ClientFactory = {
    ..._92,
    ..._93,
    ..._94
  };
}