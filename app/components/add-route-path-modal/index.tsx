"use client"
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormGroup, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { MouseEvent, MouseEventHandler, useState } from "react";
import SaveIcon from '@mui/icons-material/SaveAs';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { useMemoCall, useSetProps, useToggleBool, useValidation } from "@/app/utils/hooks";
import { RequestMethodType, requestMethods } from "@/types/request";
import { PathMinValidation, PathValidation } from "@/types/models/path";
import { ClassToObject, ConvertPureType } from "@/types/generics";


interface IProps {
    routePath: string;
    saveDocument: (value: Partial<ClassToObject<typeof PathValidation>>) => Promise<void>
}
export const AddRoutePath: React.FC<IProps> = React.memo(({ routePath, saveDocument }) => {
    const [formState, setValue, setValueProps, getPropState] = useSetProps<Partial<ConvertPureType<ClassToObject<typeof PathValidation>>>>({})




    const [modalStatus, setModalStatus, setModalStatusValue] = useToggleBool(false)


    const handleClickOpen = setModalStatus(true);
    const handleClose = useMemoCall(() => {
        setValue({});
        setModalStatusValue(false)
    });

    const [isSavingProcess, setIsSavingProcess] = useState(false);




    const [name, setName, setNameProp] = getPropState("name");
    const [path, setPath, setPathProp] = getPropState("path");
    const [method, setMethod, setMethodProp] = getPropState("method");
    const [description, setDescription, setDescriptionProp] = getPropState("description");

    const { getIfValid, getError } = useValidation(formState, PathMinValidation);

    const onSave = useMemoCall(() => {
        const value = getIfValid();
        if (value) {
            const { ...object } = value
            saveDocument(object).then(() => {
                setIsSavingProcess(false);
                handleClose();
            })
        }
    })



    return <>

        <Button variant="contained" onClick={handleClickOpen} startIcon={<CreateIcon />}>
            Add Route Path
        </Button>

        <Dialog
            open={modalStatus || isSavingProcess}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >

            <DialogTitle id="alert-dialog-title" >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}>
                    Add New Route Path
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>

            </DialogTitle>
            <form action={onSave}>
                <DialogContent>
                    <TextField
                        value={name}
                        onChange={setNameProp("target", "value")}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="filled"
                        {...getError("name")}
                    />
                    <FormControl variant="filled" fullWidth>
                        <InputLabel id="demo-simple-select-label">Method</InputLabel>
                        <Select
                            labelId="method"
                            id="method"
                            fullWidth
                            name="method"
                            value={method}
                            label="Method"
                            onChange={setMethodProp("target", "value")}
                            {...getError("method")}
                        >
                            {requestMethods.map((method: RequestMethodType[number]) => {
                                return <MenuItem value={method}>{method}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="path"
                        name="path"
                        value={path}
                        onChange={setPathProp("target", "value")}
                        label="Path"
                        type="text"
                        fullWidth
                        variant="filled"
                        {...getError("path")}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        name="description"
                        value={description}
                        onChange={setDescriptionProp("target", "value")}
                        rows={2}
                        type="text"
                        fullWidth
                        variant="standard"
                        multiline
                        {...getError("description")}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={isSavingProcess} variant="outlined">Cancel</Button>
                    <Button
                        variant="contained"
                        autoFocus
                        type="submit"
                        startIcon={
                            isSavingProcess ? <CircularProgress
                                size={20}
                                variant="indeterminate"
                            /> : <SaveIcon />}
                        disabled={isSavingProcess}
                    // onClick={onSave}
                    >
                        Save
                    </Button>
                </DialogActions>
            </form>

        </Dialog >
    </>
});

