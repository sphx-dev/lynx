export function getEnvVARs(location: { hostname: string | string[] }) {
  const config = {
    VITE_API_HOST: "localhost",
    VITE_API_PORT: 3010,
    VITE_API_URL: "//localhost:3010",
  };
  if (location.hostname.indexOf("localhost") > -1) {
    config.VITE_API_HOST = "localhost";
    config.VITE_API_PORT = 3010;
    config.VITE_API_URL = "//localhost:3010";
  }
  if (location.hostname.indexOf("demo.sphx.dev") > -1) {
    config.VITE_API_HOST = "apidemo.sphx.dev";
    config.VITE_API_PORT = 443;
    config.VITE_API_URL = "//apidemo.sphx.dev";
  }
  if (location.hostname.indexOf("non-prod.sphx.dev") > -1) {
    config.VITE_API_HOST = "api.non-prod.sphx.dev";
    config.VITE_API_PORT = 443;
    config.VITE_API_URL = "//api.non-prod.sphx.dev";
  }
  return config;
}

const config = getEnvVARs(window.location);
export default config;
