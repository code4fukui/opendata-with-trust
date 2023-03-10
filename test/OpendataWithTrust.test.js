import { makeTrust, verifyTrust } from "../OpendataWithTrust.js";
import { PEMFile } from "https://code4fukui.github.io/openbadge/PEMFile.js";

const pem1 = await Deno.readTextFile("prikey.pem");
const keys = PEMFile.decode(pem1);
const pem2 = await Deno.readTextFile("pubkey.pem");
const keys2 = PEMFile.decode(pem2);
keys.publicKey = keys2.publicKey;
console.log(keys);

const fn = "opendata.txt";
const bin = await Deno.readFile(fn);
const trust = makeTrust(bin, keys);
const trustfn = fn + ".trust.json";
console.log(trust);
await Deno.writeTextFile(trustfn, JSON.stringify(trust, null, 2));

const trust2 = JSON.parse(await Deno.readTextFile(trustfn));
console.log("verify", verifyTrust(bin, trust2));

const bin2 = new TextEncoder().encode("OPENDATA!?");
console.log("verify", verifyTrust(bin2, trust2));
