//@ts-nocheck
import * as _11 from "./wasm/v1/authz";
import * as _12 from "./wasm/v1/genesis";
import * as _13 from "./wasm/v1/ibc";
import * as _14 from "./wasm/v1/proposal_legacy";
import * as _15 from "./wasm/v1/query";
import * as _16 from "./wasm/v1/tx";
import * as _17 from "./wasm/v1/types";
import * as _65 from "./wasm/v1/tx.amino";
import * as _66 from "./wasm/v1/tx.registry";
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
      ..._65,
      ..._66
    };
  }
}