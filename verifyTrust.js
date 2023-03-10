import { verifyTrust } from "./OpendataWithTrust.js";

if (Deno.args.length < 1) {
  console.log("verifyTrust makeTrust [fn]");
  Deno.exit(1);
}
const fn = Deno.args[0];

const bin = await Deno.readFile(fn);
const trustfn = fn + ".trust.json";
const trust2 = JSON.parse(await Deno.readTextFile(trustfn));
console.log("publicKey", trust2.publicKey);
console.log("verify", verifyTrust(bin, trust2));
