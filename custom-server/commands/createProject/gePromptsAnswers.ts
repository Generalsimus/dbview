import prompts from "prompts"
import { toRgb } from "colby";

export const enum SupportedLanguages {
    Javascript = "Javascript",
    Typescript = "Typescript"
}

export const gePromptsAnswers = async () => {
    const projectName = await prompts([{
        type: 'text',
        name: 'value',
        message: 'Please specify the project name:',
        validate: (value) => (!!((value = (value + "").trim()) && /^[a-zA-Z0-9_.-]*$/gm.test(value)))
    }]).then(({ value }): string | undefined => value?.trim());

    const backendLanguage = await prompts([{
        type: 'select',
        name: 'value',
        message: 'Project Backend Language',
        choices: [
            { title: toRgb(255, 255, 0)('Javascript'), value: SupportedLanguages.Javascript },
            { title: toRgb(0, 122, 204)('Typescript'), value: SupportedLanguages.Typescript }
        ]
    }]).then(({ value }): SupportedLanguages | undefined => value)

    const fontEndLanguage = await prompts([{
        type: 'select',
        name: 'value',
        message: 'Project FontEnd Language',
        choices: [
            { title: toRgb(255, 255, 0)('Javascript'), value: SupportedLanguages.Javascript },
            { title: toRgb(0, 122, 204)('Typescript'), value: SupportedLanguages.Typescript }
        ]
    }]).then(({ value }): SupportedLanguages | undefined => value)

    return { projectName, fontEndLanguage, backendLanguage }
}