import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { SyncJavaScript } from "./syncJavaScript";
import { Validation } from "@/basic/models/validation/validation";
import path from "path";
import { writeFileSync } from "original-fs";
import { resolveOrInstallModule } from "@/utils/resolveOrInstallModule";

export function buildValidation(
  this: SyncJavaScript,
  validation: MakeAsDbDoc<Validation>
) {
  if (!this.backEndDirectory) {
    console.warn("Backend Build Directory is not defined.");
    return;
  }
  const joi = resolveOrInstallModule("joi", this.backEndDirectory);
  console.log("🚀 --> joi:", joi);
  writeFileSync(
    path.join(this.backEndDirectory, "server.js"),
    `
         
        `
  );
  console.log("🚀 --> buildValidation --> validation:", validation);
}
