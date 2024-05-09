import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { ProjectSetting } from "@/basic/models/project-settings/project-settings";
import { GetProjectSettings } from "./server";
import { useEffect } from "react";
import { CodeLanguagesEnum } from "@/basic/types";

interface FormType {
    open: boolean;
    isLoading: boolean;
    doc: Partial<ProjectSetting>;
}

const getBasicProjectSettingDoc = () => {
    return {
        backEndBuildDirection: "",
        backEndLanguage: CodeLanguagesEnum.JavaScript,
        frontEndBuildDirection: "",
    };
};
export const useProjectSettingFormController = () => {
    const form = useSetProps<FormType>(() => ({
        open: false,
        isLoading: false,
        doc: getBasicProjectSettingDoc(),
    }));
    const { value: { open } } = form;
    useEffect(() => {
        if (open) {
            GetProjectSettings().then(doc => {
                // console.log("🚀 --> GetProjectSettings --> doc:", doc);
                form.setValue((prv) => ({
                    open: true,
                    isLoading: false,
                    doc: doc || getBasicProjectSettingDoc(),
                }));
            })
        }
    }, [open])
    return form;
};
