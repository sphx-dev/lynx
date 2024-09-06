//@ts-nocheck
import * as _53 from "./crypto/keys";
import * as _54 from "./crypto/proof";
import * as _55 from "./types/block";
import * as _56 from "./types/evidence";
import * as _57 from "./types/params";
import * as _58 from "./types/types";
import * as _59 from "./types/validator";
import * as _60 from "./version/types";
export namespace tendermint {
  export const crypto = {
    ..._53,
    ..._54
  };
  export const types = {
    ..._55,
    ..._56,
    ..._57,
    ..._58,
    ..._59
  };
  export const version = {
    ..._60
  };
}