"use client"
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { } from "react";
import { RequestMethodType, requestMethods } from "@/basic/request";
import { Route, RouteSchema } from "@/basic/models/route/route";
import { MakeCreateOrUpdate, getCreateOrUpdateSchema, } from "@/basic/db-basic-schema";
// import { useMemoCall } from "@/app/resources/utils/hooks/useSignalRefresh";
import { useRouteFormController_V2 } from "./hooks";
// import { useMemoArgCall } from "@/utils/hooks/useMemoArgCall";
import { FullScreenDialogController } from "@/app/components/full-screen-dialog-controller";
import { getBasicRouteDoc } from "./utils";
import { useMemoCall } from "@/app/resources/utils/hooks/useMemoCall";
import { useMemoArgCall } from "@/app/resources/utils/hooks/useMemoArgCall";


// type ExtendsControllers = 

interface IProps extends ReturnType<typeof useRouteFormController_V2> {
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
    setProps,
    initSetProps,
    getPropState,
}) => {
    const { doc: { name, path, method, description }, open } = value;

    const onClose = useMemoCall(() => {
        setValue({
            open: false,
            doc: getBasicRouteDoc()
        })
    });
    const onOpen = useMemoCall(() => {
        setProps("open")(true);
    });


    const { getIfValid, getError } = getPropState("doc").getValidation(getCreateOrUpdateSchema(RouteSchema));

    const onSave = useMemoCall(async () => {
        const value = getIfValid(true);
        console.log({ value: value })
        if (value) {
            await saveRouteDoc(value)
            setValue({
                open: false,
                doc: getBasicRouteDoc()
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
        onDelete={value && "id" in value ? onDelete(value.id) : undefined}
    >
        <Stack display={"flex"} flexDirection={"column"} gap={3} padding={"0px 30px"}>
            <TextField
                value={name}
                onChange={initSetProps("target", "value")("doc", "name")}
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
                    onChange={initSetProps("target", "value")("doc", "method")}
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
                onChange={initSetProps("target", "value")("doc", "path")}
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
                onChange={initSetProps("target", "value")("doc", "description")}
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

