"use client"
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import React from "react";
import { RequestTypeEnum, requestMethods } from "@/basic/types";
import { Route, RouteSchema } from "@/basic/models/route/route";
import { MakeCreateOrUpdate, getCreateOrUpdateSchema, } from "@/basic/db-basic-schema";
import { useRouteFormController } from "./hooks";
import { FullScreenDialogController } from "@/app/components/full-screen-dialog-controller";
import { getBasicRouteDoc } from "./utils";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { NameInput } from "./form/name-input";
import { PathInput } from "./form/path-input";
import { DescriptionInput } from "./form/description-input";
import { MethodInput } from "./form/method-input";
import { Form } from "./form";
// import { SaveRoute, SaveRouteSchema } from "@/basic/models/route/types";


interface IProps extends ReturnType<typeof useRouteFormController> {
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

    const validation = getPropState("doc").getValidation(getCreateOrUpdateSchema(RouteSchema));
    const { getIfValid, getError } = validation

    const onSave = useMemoCall(async () => {
        const value = getIfValid(true);
        // // console.log({ value: value })
        if (value) {
            await saveRouteDoc(value)
            setValue({
                open: false,
                doc: getBasicRouteDoc()
            })
        }
    })



    const onDelete = useMemoArgCall(deleteRouteDoc);

    // console.log("🚀 --> constForm:React.FC<IProps>=React.memo --> Form:");

    return <FullScreenDialogController
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        title={title}
        onCancel={onClose}
        onSave={onSave}
        onDelete={value && "id" in value ? onDelete(value.id) : undefined}
    >
        {open && <Form validation={validation}  {...getPropState("doc")} />}
    </FullScreenDialogController>
});

