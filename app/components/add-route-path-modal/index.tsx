"use client";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import SaveIcon from '@mui/icons-material/SaveAs';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { useMemoCall, useSetProps, useToggleBool } from "@/app/utils/hooks";


interface IProps {
    routePath: string;
}
export const AddRoutePath: React.FC<IProps> = React.memo(({ routePath }) => {
    const [modalStatus, setModalStatus] = useToggleBool(false)


    const handleClickOpen = setModalStatus(true);
    const handleClose = setModalStatus(false);

    const [formState, setValue, setValueProps, getPropState] = useSetProps({
        name: "",
        path: "",
    })

    const [name, setName, setNameProp] = getPropState("name");
    // const [path, setPath] = getPropState("path");


    // const onChangeName = () => {

    // }

    // const [name1, setName2, getNAmeState2] = getNAmeState("eee");

    // const [name31, setName32] = getNAmeState2("ss");



    // console.log({ formState, name, name1, name31 })
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
                    // onChange={e => {
                    //     e.target.value
                    // }}
                    // onChange={setNameProp("target", "value")}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="filled"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="path"
                    label="Path"
                    type="text"
                    fullWidth
                    variant="filled"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Description"
                    rows={2}
                    type="text"
                    fullWidth
                    variant="standard"
                    multiline
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

