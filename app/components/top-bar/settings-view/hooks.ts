import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { ProjectSetting } from "@/basic/models/project-settings/project-settings";
import { GetProjectSettings } from "./server";
import { useEffect } from "react";

// export const useSettingsMo
interface FormType {
    open: boolean;
    isLoading: boolean;
    doc: ProjectSetting;
}

// backEndBuildDirection: string;
// frontEndBuildDirection: string;
// const routesStorage = getRouteIndexedDBStorage()
const getBasicProjectSettingDoc = () => {
    return {
        backEndBuildDirection: "",
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
