import { SyncJavaScript } from "./syncJavaScript";
// import { writeFileSync } from "original-fs";

export function nameToFunctionName(this: SyncJavaScript, name: string) {
  return name
    .trim()
    .replace(/(\s+\w)/gm, (match) => match.trim().toUpperCase());
}
