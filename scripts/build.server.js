import webpack from "webpack";
import serverConfig from "./webpack.server.config.js";

webpack(serverConfig, (err, stats) => {
  if (err) {
    console.error(err);
    throw err;
  }
  if (stats.hasErrors()) {
    console.error(stats.toJson());
    throw Error("Failed to compile");
  }
});
