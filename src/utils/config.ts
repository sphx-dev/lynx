const API_HOST = import.meta.env.VITE_API_URL;
const IS_PROD = import.meta.env.PROD

export const config = {
  apiHost: API_HOST,
  isProd: IS_PROD,
};
