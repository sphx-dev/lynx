//@ts-nocheck
import { LCDClient } from "@cosmology/lcd";
export const createLCDClient = async ({
  restEndpoint
}: {
  restEndpoint: string;
}) => {
  const requestClient = new LCDClient({
    restEndpoint
  });
  return {
    cosmwasm: {
      wasm: {
        v1: new (await import("./wasm/v1/query.lcd")).LCDQueryClient({
          requestClient
        })
      }
    }
  };
};