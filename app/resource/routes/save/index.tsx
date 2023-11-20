"use client"
import { Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState, ReactNode, useMemo } from "react";
import SaveIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
// import { useMemoCall, useSetProps, useToggleBool, useValidation } from "@/app/utils/hooks";
import { RequestMethodType, requestMethods } from "@/basic/request";
import { Route, RouteSchema } from "@/basic/models/route/route";
import { DeepPartial } from "@/basic/generics";
import { useRouter } from "next/navigation";
import { MakeCreateOrUpdate, MakeForState, getCreateOrUpdateSchema, } from "@/basic/db-basic-schema";
import { DrawerView } from "./drawer-view";
import { DeleteRoute } from "./delete-route";
// import { useToggleBool } from "@/app/utils/hooks";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";
// import { useValidation } from "@/app/utils/hooks/useValidatio";


// type StateValueType = MakeUpdate<Route> | MakeCreate<M>
interface IProps {
    saveRouteDoc: (value: MakeCreateOrUpdate<Route>) => Promise<void>;
    deleteRouteDoc: (id: number) => Promise<void>;
    initialStateValue?: MakeCreateOrUpdate<Route>;

    title: string;
    getViewControllerContent: (arg: {
        onOpen: () => void;
        onClose: () => void;
        setStateValue: (value: MakeCreateOrUpdate<MakeForState<Route>>) => void;
    }) => ReactNode;
    // onClose: () => void
}
// ConvertPureType
export const SaveRouteForm: React.FC<IProps> = React.memo(({ saveRouteDoc, deleteRouteDoc, initialStateValue, title, getViewControllerContent }) => {
    const {
        value: formState,
        setValue,
        initSetProps,
        getValidation
    } = useSetProps<MakeCreateOrUpdate<MakeForState<Route>>>(initialStateValue || {})

    const { name, path, method, description } = formState

    const [status, setModalStatus, setModalStatusValue] = useToggleBool(false)


    const onOpen = setModalStatus(true);
    const onClose = setModalStatus(false);


    const handleClose = useMemoCall(() => {
        setValue({});

        onClose()
    });

    const [isSavingProcess, setIsSavingProcess] = useState(false);



    const { getIfValid, getError } = getValidation(getCreateOrUpdateSchema(RouteSchema));


    const router = useRouter();


    const onSave = useMemoCall(() => {
        const value = getIfValid(true);
        if (value) {
            saveRouteDoc(value).then(() => {
                setIsSavingProcess(false);
                handleClose();
                router.refresh()
            })
        }
    })

    const openController = useMemo(() => getViewControllerContent({
        onOpen,
        onClose,
        setStateValue: setValue
    }), [])



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
                    <FormControl variant="filled" fullWidth>
                        <InputLabel id="demo-simple-select-label">Method</InputLabel>
                        <Select
                            labelId="method"
                            id="method"
                            fullWidth
                            name="method"
                            value={method}
                            label="Method"
                            onChange={initSetProps("target", "value")("method")}
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
                        onChange={initSetProps("target", "value")("path")}
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
                        onChange={initSetProps("target", "value")("description")}
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
                    {"id" in formState && <DeleteRoute
                        deleteRouteDoc={deleteRouteDoc}
                        getActionElement={({ setDeleteRoute }) => {
                            return <Button
                                variant="contained"
                                autoFocus
                                type="submit"
                                color="error"
                                startIcon={
                                    isSavingProcess ? <CircularProgress
                                        size={20}
                                        variant="indeterminate"
                                    /> : <DeleteIcon />}
                                disabled={isSavingProcess}
                                onClick={() => {
                                    const isValid = getIfValid();
                                    if (isValid && "id" in isValid) {
                                        setDeleteRoute(isValid)
                                    }
                                }}
                            >
                                Delete
                            </Button>

                            // <Button
                            //     onClick={handleClose}
                            //     disabled={isSavingProcess}
                            //     variant="contained"
                            //     color="error">
                            //     Delete
                            // </Button>
                        }}
                    />}
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
        {openController}
    </>
});

