import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { Validation, ValidationSchema } from "@/basic/models/validation/validation";
import { MakeCreateOrUpdate, getCreateOrUpdateSchema } from "@/basic/db-basic-schema";
import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { ValidationForm } from "./form";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { DeleteButtonModal } from "@/app/components/delete-button-modal";
import { useRouter } from "next/navigation";
import { PartialKeys } from "@/basic/generics";
import { PropertyType } from "@/app/components/object-input/types";
import { useValidationsFormController, useValidationsFormViewController } from "./hooks";
import { FullScreenDialogController } from "@/app/components/full-screen-dialog-controller";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";

export interface StateValueType extends Omit<Validation, "validations"> {
    validations: PartialKeys<PropertyType, "value">[]
}

type ExtendsControllers = ReturnType<typeof useValidationsFormViewController> & ReturnType<typeof useValidationsFormController>
interface IProps extends ExtendsControllers {
    title: string
    saveValidationDoc: (value: MakeCreateOrUpdate<Validation>) => Promise<void>
    deleteValidationDoc: (ids: number) => Promise<void>
}
export const ValidationFormModal: React.FC<IProps> = React.memo((props) => {
    const {
        title,
        open,
        onOpen,
        onClose,
        // initialValue,
        getValidation,
        value,
        saveValidationDoc,
        deleteValidationDoc
    } = props;


    const validator = getValidation(getCreateOrUpdateSchema(ValidationSchema));

    const { getIfValid, getError } = validator;

    const router = useRouter();

    const onSaveData = useMemoCall(async () => {
        const validDoc = getIfValid(true);
        if (validDoc) {
            await saveValidationDoc(validDoc)
        }
    })
    const onDelete = useMemoArgCall(deleteValidationDoc)

    return <>
        <FullScreenDialogController
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            title={title}
            onCancel={onClose}
            onSave={onSaveData}
            onDelete={value && "id" in value ? onDelete(value.id) : undefined}
        >
            <Stack display={"flex"} flexDirection={"column"} gap={3} padding={"0px 30px"}>
                <ValidationForm validator={validator} {...props} />
            </Stack>
        </FullScreenDialogController>
    </>;
});