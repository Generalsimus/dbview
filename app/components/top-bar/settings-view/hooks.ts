import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { GetProjectSettings } from "./server";
import { useEffect } from "react";
import { ProjectSettings } from "@/db/types";

interface FormType {
  open: boolean;
  isLoading: boolean;
  doc: Partial<ProjectSettings>;
}

const getBasicProjectSettingDoc = () => {
  return {
    backEndBuildDirection: "",
    backEndLanguage: "JavaScript",
    frontEndBuildDirection: "",
  } as const;
};
export const useProjectSettingFormController = () => {
  const form = useSetProps<FormType>(() => ({
    open: false,
    isLoading: false,
    doc: getBasicProjectSettingDoc(),
  }));
  const {
    value: { open },
  } = form;
  useEffect(() => {
    if (open) {
      GetProjectSettings().then((doc) => {
        // console.log("🚀 --> GetProjectSettings --> doc:", doc);
        form.setValue((prv) => ({
          open: true,
          isLoading: false,
          doc: doc || getBasicProjectSettingDoc(),
        }));
      });
    }
  }, [open]);
  return form;
};
