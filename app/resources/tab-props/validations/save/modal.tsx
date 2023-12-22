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
import { ValidationForm } from "./form/form";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { DeleteButtonModal } from "@/app/components/delete-button-modal";
import { useRouter } from "next/navigation";
import { PartialKeys } from "@/basic/generics";
import { PropertyType } from "@/app/components/object-input/types";
import { useValidationsFormController, useValidationsFormViewController } from "./hooks";

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

    const onSaveData = useMemoCall(() => {
        const validDoc = getIfValid(true);
        if (validDoc) {
            
            saveValidationDoc(validDoc).then(() => {
                onClose();
                router.refresh();
            }).catch(() => {

            })
        }
    })

    return <>
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Stack minWidth={600} maxWidth={"100vw"} >
                <DialogTitle id="alert-dialog-title" >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        {title}
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Stack>

                </DialogTitle>
                <DialogContent sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                }}>
                    <ValidationForm validator={validator} {...props} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={false} variant="outlined">Cancel</Button>
                    {value && "id" in value && <DeleteButtonModal
                        title={`Delete "${value.name}" Validation?`}
                        docId={value.id}
                        deleteFn={deleteValidationDoc}
                    />}
                    <Button
                        variant="contained"
                        autoFocus
                        type="submit"
                        startIcon={<SaveIcon />}
                        // disabled={isSavingProcess}
                        onClick={onSaveData}
                    >

                        Save
                    </Button>
                </DialogActions>
            </Stack>
        </Dialog>

    </>;
});