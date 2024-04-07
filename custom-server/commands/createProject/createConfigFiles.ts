// import { writeFileSync } from '@/custom-server/utils/writeFileSync';
import fs from 'fs';
import path from 'path';
import { SupportedLanguages } from './gePromptsAnswers';
import { getConfigFileContent } from './getConfigFileContent';
import { writeFileSync } from '../../../utils/writeFileSync';


export const createConfigFiles = (
    projectName: string,
    fontEndLanguage: SupportedLanguages,
    backendLanguage: SupportedLanguages,
    rootDir: string,
    configFilename = "dbview.conf"
) => {
    const configFIlepath = path.join(rootDir, configFilename)
    console.log("🚀 --> createConfigFiles --> configFIlepath:", configFIlepath);
    const isConfigExits = fs.existsSync(configFIlepath)
    if (isConfigExits) {
        throw new Error(`${configFIlepath} already exists In this directory.`)
    }
    writeFileSync(configFIlepath, getConfigFileContent(projectName, fontEndLanguage, backendLanguage))
    console.log("🚀 --> createConfigFiles --> isConfigExits:", isConfigExits);
}