"use client"
import React from "react";
import { getCreateOrUpdateSchema, MakeCreateOrUpdate, } from "@/basic/db-basic-schema";
import { getBasicRouteDoc } from "./utils";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { Form } from "./form";
import { DeleteRouteDoc, SaveRouteDoc } from "../server";
import { SaveRouteArgs, SaveRouteSchema } from "../schema";
import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { Breadcrumbs, Button, Stack } from "@mui/material";
import { default as MUILink } from '@mui/material/Link';
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FromContainer } from "@/app/components/form-container";
// import { useRouter } from 'next/router';

interface IProps {
    saveRouteDoc: typeof SaveRouteDoc;
    deleteRouteDoc: typeof DeleteRouteDoc
    title: string;
    initialValue?: MakeCreateOrUpdate<SaveRouteArgs>
}


export const SaveRouteForm: React.FC<IProps> = React.memo(({
    saveRouteDoc, deleteRouteDoc, title, initialValue
}) => {
    const state = useSetProps<MakeCreateOrUpdate<SaveRouteArgs>>(() => (initialValue || getBasicRouteDoc()));


    const validation = state.getValidation(getCreateOrUpdateSchema(SaveRouteSchema));
    const { getIfValid } = validation

    const router = useRouter();
    const onSave = useMemoCall(async () => {
        const value = getIfValid(true);
        if (value) {
            await saveRouteDoc(value);
        }
        router.push(`/resources/routes`)
    })


    const onDelete = useMemoCall(async () => {
        const docId = initialValue?.id
        if (typeof docId === "number") {
            await deleteRouteDoc(docId);
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

