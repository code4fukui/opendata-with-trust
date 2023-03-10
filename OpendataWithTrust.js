import { Base16 } from "https://code4fukui.github.io/Base16/Base16.js";
import Ed25519 from "https://taisukef.github.io/forge-es/lib/ed25519.js";

export const makeTrust = (bin, keys) => {
  const message = bin;
  const signature = Ed25519.sign({ privateKey: keys.privateKey, message, encoding: "binary" });
  return {
    alg: "ES256",
    publicKey: Base16.encode(keys.publicKey),
    signature: Base16.encode(signature),
  };
};

export const verifyTrust = (bin, trustjson) => {
  const publicKey = Base16.decode(trustjson.publicKey);
  if (trustjson.alg != "ES256") {
    throw new Error("unsupported alg:" + trustjson.alg);
  }
  const signature = Base16.decode(trustjson.signature);
  const message = bin;
  const chk = Ed25519.verify({ signature, publicKey, message, encoding: "binary" });
  return chk;
};
