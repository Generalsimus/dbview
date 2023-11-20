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
import { getCreateOrUpdateSchema } from "@/basic/db-basic-schema";
// import { useValidation } from "@/app/utils/hooks/useValidatio";
import { useSetProps } from "@/app/utils/hooks/useSetProps";


interface IProps {
    title: string
}
export const ValidationFormModal: React.FC<IProps> = React.memo(({ title }) => {
    const {
        value = {},
        setProps,
        initSetProps,
        getValidation,
        getPropState
    } = useSetProps<MakeStateValue<Validation>>({
        // name: "",
        // description: "",
        // validations: []
    });
    const {
        name,
        description,
        validations
    } = value;


    const { getIfValid, getError } = getValidation(getCreateOrUpdateSchema(ValidationSchema));

    return <>
        <Dialog
            open={true}
            onClose={() => {

            }}
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
                            onClick={() => { }}
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
                    <TextField
                        value={name}
                        onChange={initSetProps("target", "value")("name")}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="filled"
                        {...getError("name")}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        name="description"
                        value={description}
                        onChange={initSetProps("target", "value")("description")}
                        minRows={2}
                        type="text"
                        fullWidth
                        variant="filled"
                        multiline
                        {...getError("description")}
                    />
                    <ValidationBlockInput
                        {...getPropState("validations")}
                    // value={validations}
                    // onChange={setProps("validations")}
                    // getError={getError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { }} disabled={false} variant="outlined">Cancel</Button>
                    <Button
                        variant="contained"
                        autoFocus
                        type="submit"
                        startIcon={<SaveIcon />}
                    // disabled={isSavingProcess}
                    // onClick={onDelete}
                    >

                        Save
                    </Button>
                </DialogActions>
            </Stack>
        </Dialog>

    </>;
});
