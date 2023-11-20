import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { ValidationBlockInput } from "./form/validation-block-input";
// import { useSetProps, useValidation } from "@/app/utils/hooks";/
import { Validation, ValidationSchema } from "@/basic/models/validation/validation";
import { MakeStateValue, OptionalKeys } from "@/basic/generics";
import { MakeCreateOrUpdate, getCreateOrUpdateSchema } from "@/basic/db-basic-schema";
// import { useValidation } from "@/app/utils/hooks/useValidatio";
import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { ValidationForm } from "./form/form";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";


interface IProps {
    // title: string
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
    initialValue?: MakeStateValue<MakeCreateOrUpdate<Validation>>
}
export const ValidationFormModal: React.FC<IProps> = React.memo(({ isOpen, onOpen, onClose, initialValue = {} }) => {
    const stateController = useSetProps<MakeStateValue<MakeCreateOrUpdate<Validation>>>(initialValue);


    const { getValidation } = stateController;

    const validator = getValidation(getCreateOrUpdateSchema(ValidationSchema));

    const { getIfValid, getError } = validator;
    const onSaveData = useMemoCall(() => {
        const validDoc = getIfValid(true);
        // console.log({ stateController, validDoc })
        if (validDoc) {

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
                        {"title"}
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
