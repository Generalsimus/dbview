import React from "react";
import { ValidationsTable } from "./validations-table";
import { Header } from "./header";
import { MakeCreateOrUpdate, getCreateOrUpdateSchema } from "@/basic/db-basic-schema";
import { Validation, ValidationSchema } from "@/basic/models/validation/validation";
import { validate } from "@/utils";
import { ValidationModel } from "@/db/models/validation";
import { map } from "lodash";




async function getValidations(startIndex: number, endIndex: number) {
    const { rows, count } = await ValidationModel.findAndCountAll({
        where: {},
        order: [
            ['createdAt', 'DESC']
        ],
        limit: endIndex - startIndex,
        offset: startIndex,
    })

    return {
        validations: map(rows, "dataValues"),
        maxPathCount: count
    }
}

interface IProps {
    searchParams?: {
        start: string;
        end: string;
    }
}
export default async ({ searchParams }: IProps) => {
    let start = Number(searchParams?.start) || 0;
    let end = Number(searchParams?.end) || 15;


    const { validations, maxPathCount } = await getValidations(start, end);


    async function SaveValidationDoc(value: MakeCreateOrUpdate<Validation>): Promise<void> {
        'use server'
        console.log(value)
        const validateRes = validate(value, getCreateOrUpdateSchema(ValidationSchema))

        if (!validateRes.error) {
            const { value } = validateRes;

            const [instance, created] = await ValidationModel.upsert(value);

        }

    }
    async function DeleteValidationDoc(id: number): Promise<void> {
        'use server'
        if (typeof id === "number") {
            await ValidationModel.destroy({
                where: {
                    id: id
                },
            });
        }
    }

    return <>
        <ValidationsTable
            start={start}
            end={end}
            maxRowSize={maxPathCount}
            validations={validations}
            saveValidationDoc={SaveValidationDoc}
            deleteValidationDoc={DeleteValidationDoc}
            headerContent={
                <Header
                    saveValidationDoc={SaveValidationDoc}
                    deleteValidationDoc={DeleteValidationDoc}

                />
            }
        />
    </>;
};