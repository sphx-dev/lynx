import express from "express";
import timeout from "connect-timeout";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || "3000");
const dev = process.env.NODE_ENV !== "production";

const server = express();

//disable powered by
server.disable("x-powered-by");

//set timeout for all requests 30s
server.use(timeout(30000));

server.get("/healthcheck", (req, res) => {
  res.send({ status: "ok" });
});

// security
if (!dev) {
  server.use(
    helmet.contentSecurityPolicy({
      directives: {
        "default-src": ["'self'"],
        "connect-src": ["'self'", "https:"],
        "base-uri": ["'self'"],
        "block-all-mixed-content": [],
        "font-src": ["'self'", "https:", "data:"],
        "frame-ancestors": ["'self'"],
        "img-src": ["'self'", "data:", "http:", "https:"],
        "object-src": ["'none'"],
        "script-src": ["'self'", "https:"],
        "script-src-attr": ["'none'"],
        "style-src": ["'self'", "https:", "'unsafe-inline'"],
        "upgrade-insecure-requests": [],
      },
    })
  );
  server.use(helmet.dnsPrefetchControl());
  server.use(helmet.expectCt());
  server.use(helmet.frameguard());
  server.use(helmet.hidePoweredBy());
  server.use(helmet.hsts());
  server.use(helmet.ieNoOpen());
  server.use(helmet.noSniff());
  server.use(helmet.permittedCrossDomainPolicies());
  server.use(helmet.referrerPolicy());
  server.use(helmet.xssFilter());
}

server.use(express.static(path.join(__dirname, "build")));

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const app = server.listen(PORT, () => {
  console.info(
    "==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});

const signals = {
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15,
};
const shutdown = (signal, value) => {
  console.log("shutdown!");
  app.close(() => {
    console.log(`server stopped by ${signal} with value ${value}`);
    process.exit(128 + value);
  });
};
Object.keys(signals).forEach(signal => {
  process.on(signal, () => {
    console.log(`process received a ${signal} signal`);
    shutdown(signal, signals[signal]);
  });
});
