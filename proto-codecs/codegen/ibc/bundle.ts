//@ts-nocheck
import * as _0 from "./applications/transfer/v1/authz";
import * as _1 from "./applications/transfer/v1/denomtrace";
import * as _2 from "./applications/transfer/v1/transfer";
import * as _3 from "./applications/transfer/v1/tx";
import * as _4 from "./applications/transfer/v2/genesis";
import * as _5 from "./applications/transfer/v2/packet";
import * as _6 from "./applications/transfer/v2/queryv2";
import * as _7 from "./applications/transfer/v2/token";
import * as _8 from "./core/client/v1/client";
import * as _9 from "./core/client/v1/genesis";
import * as _10 from "./core/client/v1/tx";
import * as _62 from "./applications/transfer/v1/tx.amino";
import * as _63 from "./core/client/v1/tx.amino";
import * as _64 from "./applications/transfer/v1/tx.registry";
import * as _65 from "./core/client/v1/tx.registry";
import * as _66 from "./applications/transfer/v1/tx.rpc.msg";
import * as _67 from "./core/client/v1/tx.rpc.msg";
import * as _92 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._0,
        ..._1,
        ..._2,
        ..._3,
        ..._62,
        ..._64,
        ..._66
      };
      export const v2 = {
        ..._4,
        ..._5,
        ..._6,
        ..._7
      };
    }
  }
  export namespace core {
    export namespace client {
      export const v1 = {
        ..._8,
        ..._9,
        ..._10,
        ..._63,
        ..._65,
        ..._67
      };
    }
  }
  export const ClientFactory = {
    ..._92
  };
}