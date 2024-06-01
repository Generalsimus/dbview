import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { SyncJavaScript } from "./syncJavaScript";
import path from "path";
import { resolveOrInstallModule } from "@/utils/resolveOrInstallModule";
import { writeFileSync } from "@/utils/writeFileSync";
import { Validation } from "@/db/types";
// import { Validation } from "@prisma/client";
// import { Validation } from "@prisma/client";

export function buildValidation(
  this: SyncJavaScript,
  validation: MakeAsDbDoc<Validation>
) {
  console.log("🚀 --> validation:", validation);
  if (!this.backEndDirectory) {
    console.warn("Backend Build Directory is not defined.");
    return;
  }
  const joi = resolveOrInstallModule("joi", this.backEndDirectory);

  const filePath = path.join(
    this.backEndDirectory,
    "validations",
    `${this.nameToFileName(validation.name)}.js`
  );
  const validationFuncName = this.nameToFunctionName(validation.name);
  writeFileSync(
    filePath,
    `
    export const ${validationFuncName} = (data) => {

    }
    `
  );
  console.log("🚀 --> buildValidation --> validation:", validation);
}
