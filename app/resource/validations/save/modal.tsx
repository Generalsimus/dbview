import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
// import { ValidationBlockInput } from "./form/validation-block-input";
import { Validation, ValidationSchema } from "@/basic/models/validation/validation";
import { MakeStateValue, OptionalKeys } from "@/basic/generics";
import { MakeCreateOrUpdate, MakeForState, getCreateOrUpdateSchema } from "@/basic/db-basic-schema";
import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { ValidationForm } from "./form/form";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { DeleteButtonModal } from "@/app/components/delete-button-modal";
import { useRouter } from "next/navigation";
import { validate } from "@/utils";


interface IProps {
    title: string
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
    initialValue?: MakeStateValue<MakeCreateOrUpdate<Validation>>
    saveValidationDoc: (value: MakeCreateOrUpdate<Validation>) => Promise<void>
    deleteValidationDoc: (ids: number) => Promise<void>
}
export const ValidationFormModal: React.FC<IProps> = React.memo(({
    title,
    isOpen,
    onOpen,
    onClose,
    initialValue = {},
    saveValidationDoc,
    deleteValidationDoc
}) => {

    const stateController = useSetProps<MakeForState<Validation>>(initialValue);


    const { getValidation, value } = stateController;

    const validator = getValidation(getCreateOrUpdateSchema(ValidationSchema));

    const { getIfValid, getError } = validator;

    // console.log(JSON.stringify(value, undefined, 2))
    // console.log("validate().  ", validate(value, ValidationSchema, { abortEarly: false, stripUnknown: true, allowUnknown: false }))
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
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Stack minWidth={600} maxWidth={"100vw"}>
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
                    <ValidationForm validator={validator} {...stateController} />

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
