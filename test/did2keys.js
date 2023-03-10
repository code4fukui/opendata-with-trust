import { DIDKey } from "https://code4fukui.github.io/Ed25519/DIDKey.js";
import { Base16 } from "https://code4fukui.github.io/Base16/Base16.js";

const did = Deno.args[0];
const secret = Deno.args[1];
const privateKey = DIDKey.decode(secret);
const publicKey = DIDKey.decode(did);
const keys = { publicKey, privateKey };
console.log(keys);
console.log("publicKey", Base16.encode(keys.publicKey.data));
console.log("privateKey", Base16.encode(keys.privateKey.data));
