"use client"
import { Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState, ReactNode, useMemo } from "react";
import SaveIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { RequestMethodType, requestMethods } from "@/basic/request";
import { Route, RouteSchema } from "@/basic/models/route/route";
import { DeepPartial, PartialKeys } from "@/basic/generics";
import { useRouter } from "next/navigation";
import { MakeCreate, MakeCreateOrUpdate, MakeUpdate, getCreateOrUpdateSchema, } from "@/basic/db-basic-schema";
import { DrawerView } from "./drawer-view";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";
import { DeleteButtonModal } from "@/app/components/delete-button-modal";
import { useRouteFormViewController, useRouteFormController } from "./hooks";
// import { FullScreenDialogController } from "../../../../components/full-screen-dialog";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { FullScreenDialogController } from "@/app/components/full-screen-dialog-controller";


type ExtendsControllers = ReturnType<typeof useRouteFormViewController> & ReturnType<typeof useRouteFormController>

interface IProps extends ExtendsControllers {
    saveRouteDoc: (value: MakeCreateOrUpdate<Route>) => Promise<void>;
    deleteRouteDoc: (id: number) => Promise<void>;
    title: string;

}


export const SaveRouteForm: React.FC<IProps> = React.memo(({
    saveRouteDoc,
    deleteRouteDoc,
    title,
    value,
    setValue,
    initSetProps,
    clearState,
    getValidation,
    onClose,
    onOpen,
    open
}) => {
    const { name, path, method, description } = value || {};



    const handleClose = useMemoCall(() => {
        clearState();
        onClose();
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



    const onDelete = useMemoArgCall(deleteRouteDoc)

    return <FullScreenDialogController
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        title={title}
        onCancel={onClose}
        onSave={onSave}
        isDisabled={isSavingProcess}
        onDelete={value && "id" in value ? onDelete(value.id) : undefined}
    >
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
                        return <MenuItem key={method} value={method}>{method}</MenuItem>
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
    </FullScreenDialogController>
});

