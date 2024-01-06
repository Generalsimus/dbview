import { FullScreenDialogController } from "@/app/components/full-screen-dialog-controller";
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";
import { MakeCreateOrUpdate, getCreateOrUpdateSchema } from "@/basic/db-basic-schema";
import { Service, ServiceSchema } from "@/basic/models/services/services";
import React, { useState } from "react";
import { useServiceFormController, useServiceFormViewController } from "./hooks";
import { Stack, TextField } from "@mui/material";
import { ServiceForm } from "./form";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";


type ExtendsControllers = ReturnType<typeof useServiceFormViewController> & ReturnType<typeof useServiceFormController>

interface IProps extends ExtendsControllers {
    // interface IProps {
    saveServiceDoc: (value: MakeCreateOrUpdate<Service>) => Promise<void>;
    deleteServiceDoc: (id: number) => Promise<void>;
    title: string;
}
export const EditServiceFormModal: React.FC<IProps> = React.memo((props) => {
    const {
        saveServiceDoc,
        deleteServiceDoc,
        title,
        value,
        setValue,
        initSetProps,
        clearState,
        getValidation,
        onClose,
        onOpen,
        open
    } = props;

    const { name, description } = value || {};


    const validator = getValidation(getCreateOrUpdateSchema(ServiceSchema));
    const { getIfValid, getError } = validator;



    const onSave = useMemoCall(async () => {
        const validDoc = getIfValid(true);
        if (validDoc) {

            await saveServiceDoc(validDoc);
        }
    });

    const onDelete = useMemoArgCall(deleteServiceDoc)


    return <FullScreenDialogController
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        title={title}
        onSave={onSave}
        onCancel={onClose}
        onDelete={value && "id" in value ? onDelete(value.id) : undefined}
    >
        {open && <Stack display={"flex"} flexDirection={"column"} gap={3} padding={"0px 30px"}>
            <ServiceForm validator={validator} {...props} />
        </Stack>}
    </FullScreenDialogController>;
});
