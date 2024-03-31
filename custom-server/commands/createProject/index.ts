import prompts from "prompts"
import { toRgb } from "colby";
import { gePromptsAnswers } from "./gePromptsAnswers";
import { createConfigFiles } from "./createConfigFiles";



export const createProject = async () => {
    const { projectName, fontEndLanguage, backendLanguage } = await gePromptsAnswers()
    if (!projectName || !fontEndLanguage || !backendLanguage) return

    const rootDir = process.cwd()

    console.log(process.cwd());

    createConfigFiles(projectName, fontEndLanguage, backendLanguage, rootDir,);
    console.log({ projectName, fontEndLanguage, backendLanguage, processDir: process.cwd() });
}