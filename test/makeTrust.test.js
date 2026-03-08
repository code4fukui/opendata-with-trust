import { PEMFile } from "https://code4fukui.github.io/openbadge/PEMFile.js";
import { makeTrust } from "../makeTrust.js";

const pem1 = await Deno.readTextFile("prikey.pem");
const keys = PEMFile.decode(pem1);
const privateKey = keys.privateKey;

const fn = "opendata.txt";
await makeTrust(fn, privateKey);
