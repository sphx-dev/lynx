//@ts-nocheck
import * as _31 from "./auth/v1beta1/auth";
import * as _32 from "./auth/v1beta1/genesis";
import * as _33 from "./bank/v1beta1/authz";
import * as _34 from "./bank/v1beta1/bank";
import * as _35 from "./bank/v1beta1/genesis";
import * as _36 from "./bank/v1beta1/tx";
import * as _37 from "./base/query/v1beta1/pagination";
import * as _38 from "./base/v1beta1/coin";
import * as _39 from "./staking/v1beta1/authz";
import * as _40 from "./staking/v1beta1/genesis";
import * as _41 from "./staking/v1beta1/staking";
import * as _42 from "./staking/v1beta1/tx";
import * as _43 from "./upgrade/v1beta1/tx";
import * as _44 from "./upgrade/v1beta1/upgrade";
import * as _82 from "./bank/v1beta1/tx.amino";
import * as _83 from "./staking/v1beta1/tx.amino";
import * as _84 from "./upgrade/v1beta1/tx.amino";
import * as _85 from "./bank/v1beta1/tx.registry";
import * as _86 from "./staking/v1beta1/tx.registry";
import * as _87 from "./upgrade/v1beta1/tx.registry";
import * as _88 from "./bank/v1beta1/tx.rpc.msg";
import * as _89 from "./staking/v1beta1/tx.rpc.msg";
import * as _90 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _98 from "./rpc.tx";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._31,
      ..._32
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._33,
      ..._34,
      ..._35,
      ..._36,
      ..._82,
      ..._85,
      ..._88
    };
  }
  export namespace base {
    export namespace query {
      export const v1beta1 = {
        ..._37
      };
    }
    export const v1beta1 = {
      ..._38
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._39,
      ..._40,
      ..._41,
      ..._42,
      ..._83,
      ..._86,
      ..._89
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._43,
      ..._44,
      ..._84,
      ..._87,
      ..._90
    };
  }
  export const ClientFactory = {
    ..._98
  };
}