//@ts-nocheck
import * as _25 from "./auth/v1beta1/auth";
import * as _26 from "./auth/v1beta1/genesis";
import * as _27 from "./bank/v1beta1/authz";
import * as _28 from "./bank/v1beta1/bank";
import * as _29 from "./bank/v1beta1/genesis";
import * as _30 from "./bank/v1beta1/tx";
import * as _65 from "./bank/v1beta1/tx.amino";
import * as _68 from "./bank/v1beta1/tx.registry";
import * as _31 from "./base/query/v1beta1/pagination";
import * as _32 from "./base/v1beta1/coin";
import * as _33 from "./staking/v1beta1/authz";
import * as _34 from "./staking/v1beta1/genesis";
import * as _35 from "./staking/v1beta1/staking";
import * as _36 from "./staking/v1beta1/tx";
import * as _66 from "./staking/v1beta1/tx.amino";
import * as _69 from "./staking/v1beta1/tx.registry";
import * as _37 from "./upgrade/v1beta1/tx";
import * as _67 from "./upgrade/v1beta1/tx.amino";
import * as _70 from "./upgrade/v1beta1/tx.registry";
import * as _38 from "./upgrade/v1beta1/upgrade";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._25,
      ..._26,
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._27,
      ..._28,
      ..._29,
      ..._30,
      ..._65,
      ..._68,
    };
  }
  export namespace base {
    export namespace query {
      export const v1beta1 = {
        ..._31,
      };
    }
    export const v1beta1 = {
      ..._32,
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._33,
      ..._34,
      ..._35,
      ..._36,
      ..._66,
      ..._69,
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._37,
      ..._38,
      ..._67,
      ..._70,
    };
  }
}
