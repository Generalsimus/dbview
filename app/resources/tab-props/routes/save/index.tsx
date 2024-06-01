"use client"
import React from "react";
import { RouteSchema } from "@/basic/models/route/route";
import { MakeCreateOrUpdate, getCreateOrUpdateSchema, } from "@/basic/db-basic-schema";
import { useRouteFormController } from "./hooks";
import { FullScreenDialogController } from "@/app/components/full-screen-dialog-controller";
import { getBasicRouteDoc } from "./utils";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { Form } from "./form"; 
import { SaveRouteArgs, SaveRouteSchema } from "../../../routes/schema";


interface IProps extends ReturnType<typeof useRouteFormController> {
    saveRouteDoc: (value: MakeCreateOrUpdate<SaveRouteArgs>) => Promise<void>;
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

    const validation = getPropState("doc").getValidation(getCreateOrUpdateSchema(SaveRouteSchema));
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

    /* . 
     . ასევე ვთვლი რომ ხელისუფლებამ ფილმებზე წვდომა განძრახ აკრძალა ცდილობენ დასავლური გავლენები შეამცირონ, ხელისუფლებას სამუდამო მართველობა სურს ისევე როგორც რუსეთში */

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

