import * as sec from "https://code4fukui.github.io/sec.js/sec.js";
import { Base16 } from "https://code4fukui.github.io/Base16/Base16.js";

export const genPubkey = (prikey) => {
  return sec.pubkey(prikey);
};

// keys: { publicKey, privateKey } or privateKey
export const makeTrust = (bin, keys) => {
  if (!keys.privateKey) {
    const privateKey = keys;
    const publicKey = genPubkey(privateKey);
    keys = { publicKey, privateKey };
  }
  const message = bin;
  const signature = sec.sign(keys.privateKey, message);
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
  const chk = sec.verify(signature, publicKey, message);
  return chk;
};
