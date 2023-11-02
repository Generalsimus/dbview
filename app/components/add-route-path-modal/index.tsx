"use client";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import SaveIcon from '@mui/icons-material/SaveAs';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { useMemoCall, useSetProps, useToggleBool, useValidation } from "@/app/utils/hooks";
import { RequestMethodType, requestMethods } from "@/types/request";
import { PathDoc, PathDocType } from "@/types/models/path";
import { ConvertPureType } from "@/types/generics";



interface IProps {
    routePath: string;
}
export const AddRoutePath: React.FC<IProps> = React.memo(({ routePath }) => {
    const [modalStatus, setModalStatus] = useToggleBool(false)


    const handleClickOpen = setModalStatus(true);
    const handleClose = setModalStatus(false);




    const [formState, setValue, setValueProps, getPropState] = useSetProps<Partial<ConvertPureType<PathDocType>>>({})
    

    const [name, setName, setNameProp] = getPropState("name");
    const [path, setPath, setPathProp] = getPropState("path");
    const [method, setMethod, setMethodProp] = getPropState("method");
    const [description, setDescription, setDescriptionProp] = getPropState("description");



    const getError = useValidation(formState, PathDoc);


    return <>

        <Button variant="contained" onClick={handleClickOpen} startIcon={<CreateIcon />}>
            Add Route Path
        </Button>

        <Dialog
            open={modalStatus}
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
                        value={method}
                        label="Method"
                        onChange={setMethodProp("target", "value")}
                        {...getError("method")}
                    >
                        {requestMethods.map((method: RequestMethodType[number]) => {
                            return <MenuItem value={method.toLowerCase()}>{method.toUpperCase()}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <TextField
                    autoFocus
                    margin="dense"
                    id="path"
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
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button onClick={handleClose} autoFocus variant="contained" startIcon={<SaveIcon />}>
                    Save
                </Button>
            </DialogActions>

        </Dialog>
    </>
});

