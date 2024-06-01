"use client"
import React from "react";
import { getCreateOrUpdateSchema, MakeCreateOrUpdate, } from "@/basic/db-basic-schema";
import { getBasicRouteDoc } from "./utils";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { Form } from "./form";
import { DeleteRouteDoc, SaveRouteDoc } from "../server";
import { SaveRouteArgs, SaveRouteSchema } from "../schema";
import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { useRouter } from "next/navigation";
import { FromContainer } from "@/app/components/form-container";


interface IProps {
    title: string;
    initialValue?: MakeCreateOrUpdate<SaveRouteArgs>
}


export const SaveRouteForm: React.FC<IProps> = React.memo(({
    title, initialValue
}) => {
    const state = useSetProps<MakeCreateOrUpdate<SaveRouteArgs>>(() => (initialValue || getBasicRouteDoc()));


    const validation = state.getValidation(getCreateOrUpdateSchema(SaveRouteSchema));
    const { getIfValid } = validation

    const router = useRouter();
    const onSave = useMemoCall(async () => {
        const value = getIfValid(true);
        if (value) {
            await SaveRouteDoc(value);
        }
        router.push(`/resources/routes`)
    })


    const onDelete = useMemoCall(async () => {
        const docId = initialValue?.id
        if (typeof docId === "number") {
            await DeleteRouteDoc(docId);
            router.push(`/resources/routes`)
        }
    })
    // useMemoArgCall(deleteRouteDoc);

    return <>
        <FromContainer
            isEdit={!!initialValue}
            title={title}
            onSave={onSave}
            onDelete={onDelete}
            startBreadcrumbs={[
                { title: "Routes", href: "/resources/routes" }
            ]}

        >
            <Form validation={validation}  {...state} />
        </FromContainer>
    </>
});

