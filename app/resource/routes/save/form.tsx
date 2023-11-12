"use client"
import { Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState, ReactNode } from "react";
import SaveIcon from '@mui/icons-material/SaveAs';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { useMemoCall, useSetProps, useToggleBool, useValidation } from "@/app/utils/hooks";
import { RequestMethodType, requestMethods } from "@/basic/request";
import { Route, RouteSchema } from "@/basic/models/route";
import { DeepPartial } from "@/basic/generics";
import { useRouter } from "next/navigation";
import { ExtendDbKeys, PartialDbKeys, partialDbKeySchema } from "@/basic/db-basic-schema";
import { DrawerView } from "./drawer-view";


interface IProps {
    saveRouteDoc: (value: PartialDbKeys<ExtendDbKeys<Route>>) => Promise<void>;
    initialStateValue?: DeepPartial<ExtendDbKeys<Route>>;

    title: string;
    getViewControllerContent: (arg: {
        onOpen: () => void;
        onClose: () => void;
        setStateValue: (value: DeepPartial<ExtendDbKeys<Route>>) => void;
    }) => ReactNode;
    // onClose: () => void
}
export const SaveRouteForm: React.FC<IProps> = React.memo(({ saveRouteDoc, initialStateValue, title, getViewControllerContent }) => {
    const [formState, setValue, setValueProps, getPropState] = useSetProps(initialStateValue || {})


    const [status, setModalStatus, setModalStatusValue] = useToggleBool(false)


    const onOpen = setModalStatus(true);
    const onClose = setModalStatus(false);


    // const [modalStatus, setModalStatus, setModalStatusValue] = useToggleBool(false)


    // const handleClickOpen = setModalStatus(true);
    const handleClose = useMemoCall(() => {
        setValue({});

        onClose()
    });

    const [isSavingProcess, setIsSavingProcess] = useState(false);




    const [name, setName, setNameProp] = getPropState("name");
    const [path, setPath, setPathProp] = getPropState("path");
    const [method, setMethod, setMethodProp] = getPropState("method");
    const [description, setDescription, setDescriptionProp] = getPropState("description");

    const { getIfValid, getError } = useValidation(formState, partialDbKeySchema(RouteSchema));
    const router = useRouter();


    const onSave = useMemoCall(() => {
        const value = getIfValid();
        if (value) {
            saveRouteDoc(value).then(() => {
                setIsSavingProcess(false);
                handleClose();
                router.refresh()
            })
        }
    })



    return <>
        <DrawerView
            title={title}
            // 
            status={status || isSavingProcess}
            onClose={onClose}
        >
            <Stack display={"flex"} flexDirection={"column"} justifyContent={"space-between"} flex={1}>
                <Stack display={"flex"} flexDirection={"column"} gap={3} padding={"0px 30px"}>
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
                        minRows={2}
                        type="text"
                        fullWidth
                        variant="filled"
                        multiline
                        {...getError("description")}
                    />

                </Stack>
                <Stack display={"flex"} flexDirection={"row"} gap={2} justifyContent={"flex-end"} padding={2}>
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
                        onClick={onSave}
                    >
                        Save
                    </Button>
                </Stack>
            </Stack>
        </DrawerView>
        {getViewControllerContent({
            onOpen,
            onClose,
            setStateValue: getPropState
        })}
    </>
});

