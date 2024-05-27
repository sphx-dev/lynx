import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  entry: "./server.js",
  target: "node",
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      // Definitions to fix "formidable.js"
      // needed for superagent
      "global.GENTLY": false,
    }),
  ],

  output: {
    path: path.resolve(__dirname, "../"),
    filename: "server-comp.cjs",
  },
};

export default config;
