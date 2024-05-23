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
  return config;
}

const config = getEnvVARs(window.location);
export default config;
