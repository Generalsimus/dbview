import { MakeAsDbDoc } from "@/utils/db-basic-schema";
import { SyncJavaScript } from "./syncJavaScript";
import path from "path";
import { resolveOrInstallModule } from "@/utils/resolveOrInstallModule";
import { writeFileSync } from "@/utils/writeFileSync";
import { GetKyselyModel } from "@/utils/generics";
import { Model } from "@/db/types";
// import { Validation } from "@/db/types";
// import { Validation } from "@prisma/client";
// import { Validation } from "@prisma/client";

export function buildValidation(
  this: SyncJavaScript,
  model: GetKyselyModel<Model>
) {
  // console.log("🚀 --> validation:", validation);
  // if (!this.backEndDirectory) {
  //   console.warn("Backend Build Directory is not defined.");
  //   return;
  // }
  // const joi = resolveOrInstallModule("joi", this.backEndDirectory);

  // const filePath = path.join(
  //   this.backEndDirectory,
  //   "validations",
  //   `${this.nameToFileName(validation.name)}.js`
  // );
  // const validationFuncName = this.nameToFunctionName(validation.name);
  // writeFileSync(
  //   filePath,
  //   `
  //   export const ${validationFuncName} = (data) => {

  //   }
  //   `
  // );
  // console.log("🚀 --> buildValidation --> validation:", validation);
}
