import React from "react";
import { ValidationsTable } from "./validations-table";
import { Header } from "./header";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Validation } from "@/basic/models/validation/validation";

interface IProps {
}
export default ({ }) => {
    async function SaveValidationDoc(value: MakeCreateOrUpdate<Validation>): Promise<void> {
        'use server'
        console.log(value)


    }
    async function DeleteValidationDoc(id: number): Promise<void> {
        'use server'

    }

    return <>

        <ValidationsTable
            headerContent={
                <Header
                    saveValidationDoc={SaveValidationDoc}
                    deleteValidationDoc={DeleteValidationDoc}

                />
            }
        />

    </>;
};
