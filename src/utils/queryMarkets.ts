import { getChain } from "../config";
import { createRPCQueryClient } from "../../proto-codecs/codegen/sphx/rpc.query";
import { sphx } from "../../proto-codecs";
import { MarketStatus } from "../../proto-codecs/codegen/sphx/order/market";

export const getAllMarkets = async () => {
  const queryClient = await createRPCQueryClient({
    rpcEndpoint: getChain().rpc,
  });

  const response = await queryClient.sphx.order.markets({});

  return response;
};

export const createMarket = async () => {
  // TODO: build a message like this
  const message = sphx.order.MessageComposer.withTypeUrl.registerMarket({
    authority: "TODO: set authority here",
    market: {
      id: BigInt(1),
      ticker: "BTCUSDT.P",
      status: MarketStatus.STATUS_ACTIVE,
      baseAsset: "BTC",
      quoteAsset: "USDT",
    },
  });
  console.log("createMarket msg:", message);
  // TODO: get signing client
  // TODO: sign and broadcast
};
