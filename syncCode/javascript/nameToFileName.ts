import { SyncJavaScript } from "./syncJavaScript";
// import { writeFileSync } from "original-fs";

export function nameToFileName(this: SyncJavaScript, name: string) {
  return name.trim().replace(/\s+/, "-").toLowerCase();
}
