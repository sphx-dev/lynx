const fs = require("fs");

const UNDEFINED_VERSION = "UNDEFINED";
let version = {
  GIT_COMMIT: null,
  GIT_TAG: null,
};

export const createVersionInfoMiddleware = () => {
  return function (_req, res) {
    if (version.GIT_COMMIT !== null) {
      return res.send(version);
    }

    version = loadVersionInfo();
    res.send(version);
  };
};

function loadVersionInfo() {
  let GIT_COMMIT = UNDEFINED_VERSION;
  let GIT_TAG = UNDEFINED_VERSION;
  try {
    GIT_COMMIT = fs.readFileSync("./git_commit").toString();
  } catch (err) {
    console.log(err);
  }
  try {
    GIT_TAG = fs.readFileSync("./git_tag").toString();
  } catch (err) {
    console.log(err);
  }
  return {
    GIT_COMMIT,
    GIT_TAG,
  };
}
