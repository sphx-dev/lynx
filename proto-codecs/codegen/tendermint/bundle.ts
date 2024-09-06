//@ts-nocheck
import * as _47 from "./crypto/keys";
import * as _48 from "./crypto/proof";
import * as _49 from "./types/block";
import * as _50 from "./types/evidence";
import * as _51 from "./types/params";
import * as _52 from "./types/types";
import * as _53 from "./types/validator";
import * as _54 from "./version/types";
export namespace tendermint {
  export const crypto = {
    ..._47,
    ..._48,
  };
  export const types = {
    ..._49,
    ..._50,
    ..._51,
    ..._52,
    ..._53,
  };
  export const version = {
    ..._54,
  };
}
