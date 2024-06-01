"use client";
import React from "react";
import {
    getCreateOrUpdateSchema,
    MakeCreateOrUpdate,
} from "@/basic/db-basic-schema";
import { getBasicServiceDoc } from "./utils";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { Form } from "./form";
import {
    DeleteServiceDoc,
    SaveServiceArgs,
    SaveServiceDoc,
} from "../server";
import { saveServiceSchema } from "../schema";
import { useSetProps } from "@/app/utils/hooks/useSetProps";
import { useRouter } from "next/navigation";
import { FromContainer } from "@/app/components/form-container";


interface IProps {
    title: string;
    initialValue?: MakeCreateOrUpdate<SaveServiceArgs>;
}

export const SaveRouteForm: React.FC<IProps> = React.memo(
    ({ title, initialValue }) => {
        const state = useSetProps<MakeCreateOrUpdate<SaveServiceArgs>>(
            () => initialValue || getBasicServiceDoc()
        );

        const validation = state.getValidation(
            getCreateOrUpdateSchema(saveServiceSchema)
        );
        const { getIfValid } = validation;

        const router = useRouter();
        const onSave = useMemoCall(async () => {
            const value = getIfValid(true);
            if (value) {
                await SaveServiceDoc(value);
            }
            router.push(`/resources/services`);
        });

        const onDelete = useMemoCall(async () => {
            const docId = initialValue?.id;
            if (typeof docId === "number") {
                await DeleteServiceDoc(docId);
                router.push(`/resources/services`);
            }
        });

        return (
            <>
                <FromContainer
                    isEdit={!!initialValue}
                    title={title}
                    onSave={onSave}
                    onDelete={onDelete}
                    startBreadcrumbs={[{ title: "Services", href: "/resources/services" }]}
                >
                    <Form  {...state} />
                </FromContainer>
            </>
        );
    }
);
