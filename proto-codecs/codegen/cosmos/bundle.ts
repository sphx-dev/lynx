//@ts-nocheck
import * as _32 from "./auth/v1beta1/auth";
import * as _33 from "./auth/v1beta1/genesis";
import * as _34 from "./bank/v1beta1/authz";
import * as _35 from "./bank/v1beta1/bank";
import * as _36 from "./bank/v1beta1/genesis";
import * as _37 from "./bank/v1beta1/tx";
import * as _38 from "./base/query/v1beta1/pagination";
import * as _39 from "./base/v1beta1/coin";
import * as _40 from "./staking/v1beta1/authz";
import * as _41 from "./staking/v1beta1/genesis";
import * as _42 from "./staking/v1beta1/staking";
import * as _43 from "./staking/v1beta1/tx";
import * as _44 from "./upgrade/v1beta1/tx";
import * as _45 from "./upgrade/v1beta1/upgrade";
import * as _83 from "./bank/v1beta1/tx.amino";
import * as _84 from "./staking/v1beta1/tx.amino";
import * as _85 from "./upgrade/v1beta1/tx.amino";
import * as _86 from "./bank/v1beta1/tx.registry";
import * as _87 from "./staking/v1beta1/tx.registry";
import * as _88 from "./upgrade/v1beta1/tx.registry";
import * as _89 from "./bank/v1beta1/tx.rpc.msg";
import * as _90 from "./staking/v1beta1/tx.rpc.msg";
import * as _91 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _99 from "./rpc.tx";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._32,
      ..._33
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._34,
      ..._35,
      ..._36,
      ..._37,
      ..._83,
      ..._86,
      ..._89
    };
  }
  export namespace base {
    export namespace query {
      export const v1beta1 = {
        ..._38
      };
    }
    export const v1beta1 = {
      ..._39
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._40,
      ..._41,
      ..._42,
      ..._43,
      ..._84,
      ..._87,
      ..._90
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._44,
      ..._45,
      ..._85,
      ..._88,
      ..._91
    };
  }
  export const ClientFactory = {
    ..._99
  };
}