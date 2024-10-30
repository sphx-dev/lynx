import { SigningStargateClient } from "@cosmjs/stargate";
import { getChain } from "../config";
import { getOfflineSigner } from "./getOfflineSigner";
import { DENOMUSDC } from "@/constants";

export async function sendTokens(
  {
    from,
    to,
    amount,
    denom = DENOMUSDC,
    memo = "",
  }: {
    from: string;
    to: string;
    amount: number;
    denom: string;
    memo?: string;
  },
  onSuccess?: () => void,
  onError?: (error: any) => void
) {
  try {
    const offlineSigner = await getOfflineSigner();
    const client = await SigningStargateClient.connectWithSigner(
      getChain().rpc,
      offlineSigner
    );

    // Define the amount to send (in microdenom units, e.g., 1000000 uatom = 1 ATOM)
    const amountFinal = {
      denom: denom, // Denomination, e.g., 'uatom'
      amount: amount.toString(),
    };

    // Define the fee (you should adjust this based on network congestion)
    const fee = {
      amount: [
        {
          denom: denom,
          amount: "5000", // Transaction fee in microdenom (e.g., 5000 uatom)
        },
      ],
      gas: "200000", // Adjust the gas limit based on transaction complexity
    };

    // Send tokens (broadcast the transaction)
    const result = await client.sendTokens(from, to, [amountFinal], fee, memo);

    // Check if the transaction was successful
    //   assertIsBroadcastTxSuccess(result);
    console.log("Transaction successful:", result);

    if (result.code === 0) {
      onSuccess?.();
    } else {
      onError?.(getErrorFromCode(result.code));
    }
  } catch (error) {
    console.error("Error sending tokens:", error);
    onError?.((error as Error).message);
  }
}

const getErrorFromCode = (code: number) => {
  switch (code) {
    case 0:
      return "Success";
    case 1:
      return "Internal error";
    case 2:
      return "Tx parse error";
    case 3:
      return "Invalid sequence";
    case 4:
      return "Unauthorized";
    case 5:
      return "Insufficient funds";
    case 6:
      return "Unknown request";
    case 7:
      return "Invalid address";
    case 8:
      return "Invalid pubkey";
    case 9:
      return "Unknown address";
    case 10:
      return "Insufficient fees";
    case 11:
      return "Invalid coins";
    case 12:
      return "Out of gas";
    case 13:
      return "Memo too large";
    case 14:
      return "Insufficient privilege";
    default:
      return "Unknown error";
  }
};
