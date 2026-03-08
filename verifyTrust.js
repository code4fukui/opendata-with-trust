import * as owt from "./OpendataWithTrust.js";

export const verifyTrust = async (fn) => {
  const bin = await Deno.readFile(fn);
  const trustfn = fn + ".trust.json";
  const trust2 = JSON.parse(await Deno.readTextFile(trustfn));
  console.log("publicKey", trust2.publicKey);
  const res = owt.verifyTrust(bin, trust2);
  console.log("verify", res);
  if (!res) throw new Error("can't verify");
};

if (import.meta.main) {
  if (Deno.args.length < 1) {
    console.log("verifyTrust makeTrust [fn]");
    Deno.exit(1);
  }
  const fn = Deno.args[0];
  await verifyTrust(fn);
}
