import { PEMFile } from "https://code4fukui.github.io/openbadge/PEMFile.js";
import { genPubkey } from "../OpendataWithTrust.js";
import { Base16 } from "https://code4fukui.github.io/Base16/Base16.js";

const fn = Deno.args[0];

const pem = await Deno.readTextFile(fn);
const keys = PEMFile.decode(pem);
if (keys.privateKey) {
  keys.publicKey = genPubkey(keys.privateKey);
} else {
  keys.privateKey = [];
}
//console.log(keys);
console.log("publicKey", Base16.encode(keys.publicKey));
console.log("privateKey", Base16.encode(keys.privateKey));
