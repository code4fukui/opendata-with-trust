import { makeTrust, verifyTrust } from "./OpendataWithTrust.js";
import { Base16 } from "https://code4fukui.github.io/Base16/Base16.js";

if (Deno.args.length < 2) {
  console.log("makeTrust [fn] [privateKey in Base16]");
  Deno.exit(1);
}

const fn = Deno.args[0];
const privateKey = Base16.decode(Deno.args[1]);

const bin = await Deno.readFile(fn);
const trust = makeTrust(bin, privateKey);
const trustfn = fn + ".trust.json";
console.log(trust);
await Deno.writeTextFile(trustfn, JSON.stringify(trust, null, 2));

const trust2 = JSON.parse(await Deno.readTextFile(trustfn));
console.log("verify", verifyTrust(bin, trust2));
