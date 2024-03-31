import { SupportedLanguages } from "./gePromptsAnswers"

export const getConfigFileContent = (
    projectNameL: string,
    fontEndLanguage: SupportedLanguages,
    backendLanguage: SupportedLanguages
) => {
    return `# project ${projectNameL}
    project_name="Gladiator"
    # build server files
    build-server= "./server"
    # server language
    server-language="${backendLanguage}"
    # build font-end files
    build-font="./font" 
    # font-end language
    font-language="${fontEndLanguage}"`.trim().replace(/((^|$)(\s+))/gm, "\n")
} 