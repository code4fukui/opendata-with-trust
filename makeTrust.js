import * as owt from "./OpendataWithTrust.js";
import { Base16 } from "https://code4fukui.github.io/Base16/Base16.js";

export const makeTrust = async (fn, prikey) => {
  if (typeof prikey == "string") prikey = Base16.decode(prikey);
  const bin = await Deno.readFile(fn);
  const trust = owt.makeTrust(bin, prikey);
  const trustfn = fn + ".trust.json";
  await Deno.writeTextFile(trustfn, JSON.stringify(trust, null, 2));
  const trust2 = JSON.parse(await Deno.readTextFile(trustfn));
  if (!owt.verifyTrust(bin, trust2)) throw new Error("can't verify error!?");
};

if (import.meta.main) {
  if (Deno.args.length < 2) {
    console.log("makeTrust [fn] [privateKey in Base16]");
    Deno.exit(1);
  }
  const fn = Deno.args[0];
  const privateKey = Deno.args[1];
  await makeTrust(fn, privateKey);
}
