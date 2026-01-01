import { Base16 } from "https://code4fukui.github.io/Base16/Base16.js";
import Ed25519 from "https://code4fukui.github.io/forge-es/lib/ed25519.js";

export const genPubkey = (prikey) => {
  return new Uint8Array(Ed25519.generateKeyPair({ seed: prikey }).publicKey);
};

// keys: { publicKey, privateKey } or privateKey
export const makeTrust = (bin, keys) => {
  if (!keys.privateKey) {
    const privateKey = keys;
    const publicKey = genPubkey(privateKey);
    keys = { publicKey, privateKey };
  }
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
