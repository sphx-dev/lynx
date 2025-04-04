import config from "@/config";
import { signArbitrary, verifyArbitrary } from "@/utils/getOfflineSigner";

import { verifyADR36Amino } from "@keplr-wallet/cosmos";
import { fromBase64 } from "@cosmjs/encoding";

const API_URL = window.location.protocol + config.VITE_API_URL;

function BuildCanonicalOrderJSON(o: OrderData): string {
  return `{"price":"${o.price}","volume":"${o.volume}","is_buy":${o.is_buy},"leverage":${o.leverage},"trigger_price":"${o.trigger_price}","order_type":"${o.order_type}","chain_order_id":"${o.chain_order_id}"}`;
}

export async function hashMessage(message: string) {
  // Convert string to bytes
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  // Compute the hash
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert to Uint8Array
  return bytesToHex(new Uint8Array(hashBuffer));
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}

function validateSignatureFormat(
  signatureBase64: string,
  pubkeyBase64: string
) {
  const sigBytes = Uint8Array.from(atob(signatureBase64), c => c.charCodeAt(0));
  const pubKeyBytes = Uint8Array.from(atob(pubkeyBase64), c => c.charCodeAt(0));

  console.log("Signature Length:", sigBytes.length); // should be 64 or 65
  console.log("PubKey Length:", pubKeyBytes.length); // should be 33

  if (sigBytes.length !== 64 && sigBytes.length !== 65) {
    throw new Error(
      `Invalid signature length: got ${sigBytes.length}, expected 64 or 65`
    );
  }

  if (pubKeyBytes.length !== 33) {
    throw new Error(
      `Invalid pubkey length: got ${pubKeyBytes.length}, expected 33`
    );
  }

  console.log("Signature and pubkey formats are valid ✅");
}

export async function placeOrderSigned(
  walletAddress: string,
  ticker: string,
  orderData: OrderData
) {
  const msg = BuildCanonicalOrderJSON(orderData);
  const signature = await signArbitrary(walletAddress, msg);

  console.log("SIGNATURE----------------------*************", signature);
  console.log("MSG----------------------*************", msg);
  console.log(
    "HASH MSG----------------------*************",
    await hashMessage(msg)
  );

  const verification = await verifyArbitrary(walletAddress, msg, signature);
  console.log("VERIFICATION----------------------*************", verification);

  ///////////////////////////////////////
  const isValid = verifyADR36Amino(
    "sphx", // Bech32 prefix
    walletAddress, // Signer's Bech32 address
    msg, // Original message
    fromBase64(signature.pub_key.value), // Public key
    fromBase64(signature.signature) // Signature
  );

  console.log("Is signature valid?", isValid);
  ///////////////////////////////////////

  validateSignatureFormat(signature.signature, signature.pub_key.value);

  const body = JSON.stringify({
    chain_order_id: orderData.chain_order_id,
    is_buy: orderData.is_buy,
    leverage: orderData.leverage,
    order_type: orderData.order_type,
    price: orderData.price.toString(),
    trigger_price: orderData.trigger_price.toString(),
    volume: orderData.volume.toString(),
    signature: signature.signature,
    pubkey: signature.pub_key.value,
  });

  let urlPath = "";
  if (orderData.order_type === "limit") {
    urlPath = "/order/limit";
  } else if (orderData.order_type === "market") {
    urlPath = "/order/market";
  } else {
    throw new Error("Invalid order type");
  }

  const response = await fetch(API_URL + urlPath + `?ticker=${ticker}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-ACCOUNT-ID": walletAddress,
    },
    body: body,
  });

  if (!response.ok) {
    console.error("Failed to place order:", response.statusText);
    throw new Error("Failed to place order");
  }

  return response.json();
}

type OrderData = {
  price: number;
  volume: number;
  is_buy: boolean;
  leverage: number;
  trigger_price: number;
  order_type: string;
  chain_order_id: string;
};
