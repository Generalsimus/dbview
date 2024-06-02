import React from "react";
import { InputProps } from "@/utils/generics";
import { MakeCreateOrUpdate } from "@/utils/db-basic-schema";
import { SaveProjectSettingsArgs } from "../server";
import { BackEndLanguageInput } from "./back-end-language-input";
import { BackEndDirectoryInput } from "./back-end directory-input";
import { FrontEndDirectoryInput } from "./front-end directory-input";

interface IProps extends InputProps<MakeCreateOrUpdate<SaveProjectSettingsArgs>> {
}

export const Form: React.FC<IProps> = React.memo(({ getPropState }) => {

    return <>
        <BackEndDirectoryInput
            {...getPropState("backEndBuildDirection")}
        />
        <BackEndLanguageInput
            {...getPropState("backEndLanguage")}
        />
        <FrontEndDirectoryInput
            {...getPropState("frontEndBuildDirection")}
        />
    </>;
});
