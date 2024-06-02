import { GetKyselyModel } from "@/utils/generics";
import { ProjectSettings, Service } from "@/db/types";
import Joi from "joi";

export const codeLanguages: Exclude<ProjectSettings["backEndLanguage"], null>[] = ['TypeScript', 'JavaScript']

export const ProjectSettingSchema = Joi.object<ProjectSettings>({
  backEndBuildDirection: Joi.string().optional().default(null),
  backEndLanguage: Joi.string().valid(...codeLanguages).default(null),
  frontEndBuildDirection: Joi.string().optional().default(null),
}) 