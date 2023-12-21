"use server"
import { MakeCreateOrUpdate, getCreateOrUpdateSchema } from "@/basic/db-basic-schema";
import { Validation, ValidationSchema } from "@/basic/models/validation/validation";
import { ValidationModel } from "@/db/models/validation";
import { validate } from "@/utils";
import { map } from "lodash";

export async function getValidations(startIndex: number, endIndex: number) {
    const { rows, count } = await ValidationModel.findAndCountAll({
        where: {},
        order: [
            ['createdAt', 'DESC']
        ],
        limit: endIndex - startIndex,
        offset: startIndex,
    })

    return {
        docs: map(rows, "dataValues"),
        maxDocsCount: count
    }
}

export async function SaveValidationDoc(value: MakeCreateOrUpdate<Validation>): Promise<void> {
    'use server'
    // console.log(value)
    const validateRes = validate(value, getCreateOrUpdateSchema(ValidationSchema))
    // console.log({ validateRes ,value})
    if (!validateRes.error) {
        const { value } = validateRes;

        const [instance, created] = await ValidationModel.upsert(value);

    }

}
export async function DeleteValidationDoc(id: number): Promise<void> {
    'use server'
    if (typeof id === "number") {
        await ValidationModel.destroy({
            where: {
                id: id
            },
        });
    }
}