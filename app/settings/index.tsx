"use client"
import React, { ComponentProps } from "react";
import { Pagination } from "@/app/components/pagination";
import { useSetProps } from "../utils/hooks/useSetProps";
import { Form } from "./form";
import { getBasicProjectSettingDoc } from "./utils";
import { SaveProjectSettingsArgs, SaveProjectSettingsDoc } from "./server";
import { useMemoCall } from "../utils/hooks/useMemoCall";
import { getCreateOrUpdateSchema, MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { ProjectSettingSchema } from "./schema";
import { FromContainer } from "../components/form-container";
import { Stack } from "@mui/material";



interface IProps {
    initialValue?: MakeCreateOrUpdate<SaveProjectSettingsArgs>;
}
export const SettingsPage: React.FC<IProps> = React.memo(({ initialValue }) => {


    const form = useSetProps<SaveProjectSettingsArgs>(() => (initialValue || getBasicProjectSettingDoc()));
    const { getIfValid, getError } = form.getValidation(
        getCreateOrUpdateSchema(ProjectSettingSchema)
    );


    const onSave = useMemoCall(async () => {
        const saveDoc = getIfValid();
        if (saveDoc) {
            await SaveProjectSettingsDoc(saveDoc);
        }
    });
    return (
        <>
            <FromContainer
                title={"Settings"}
                onSave={onSave}
            >
                <Stack sx={{ gap: 2 }}>
                    <Form  {...form} />
                </Stack>
            </FromContainer>
        </>
    );
});
