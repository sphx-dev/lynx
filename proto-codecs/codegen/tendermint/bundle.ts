//@ts-nocheck
import * as _54 from "./crypto/keys";
import * as _55 from "./crypto/proof";
import * as _56 from "./types/block";
import * as _57 from "./types/evidence";
import * as _58 from "./types/params";
import * as _59 from "./types/types";
import * as _60 from "./types/validator";
import * as _61 from "./version/types";
export namespace tendermint {
  export const crypto = {
    ..._54,
    ..._55
  };
  export const types = {
    ..._56,
    ..._57,
    ..._58,
    ..._59,
    ..._60
  };
  export const version = {
    ..._61
  };
}