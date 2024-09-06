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
    sphx: {
      marginacc: new (await import("./marginacc/query.lcd")).LCDQueryClient({
        requestClient
      }),
      order: new (await import("./order/query.lcd")).LCDQueryClient({
        requestClient
      })
    }
  };
};