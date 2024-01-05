"use client"
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { } from "react";
import { RequestMethodType, requestMethods } from "@/basic/request";
import { Route, RouteSchema } from "@/basic/models/route/route";
import { MakeCreateOrUpdate, getCreateOrUpdateSchema, } from "@/basic/db-basic-schema";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useRouteFormViewController, useRouteFormController } from "./hooks";
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



    const { getIfValid, getError } = getValidation(getCreateOrUpdateSchema(RouteSchema));


    const onSave = useMemoCall(async () => {
        const value = getIfValid(true);
        if (value) {
            await saveRouteDoc(value)
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

