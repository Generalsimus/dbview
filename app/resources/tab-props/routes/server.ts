"use server"
import { MakeCreateOrUpdate, getCreateOrUpdateSchema } from "@/basic/db-basic-schema";
import { Route, RouteSchema } from "@/basic/models/route/route";
import { RouteModel } from "@/db/models/route";
import { validate } from "@/utils";

export async function SaveRouteDoc(value: MakeCreateOrUpdate<Route>): Promise<void> {
    'use server'
    const validateRes = validate(value, getCreateOrUpdateSchema(RouteSchema))

    if (!validateRes.error) {
        const { value } = validateRes;

        const [instance, created] = await RouteModel.upsert(value);

    }

};

export async function DeleteRouteDoc(id: number): Promise<void> {
    'use server'
    if (typeof id === "number") {
        await RouteModel.destroy({
            where: {
                id: id
            },
        });
    }

}

export async function getRouteDocs(startIndex: number, endIndex: number) {
    'use server'
    const { rows, count } = await RouteModel.findAndCountAll({
        where: {},
        order: [
            ['createdAt', 'DESC']
        ],
        limit: endIndex - startIndex,
        offset: startIndex
    })

    const docs = rows.map(el => el.dataValues)
    return {
        docs: [...docs, ...docs, ...docs, ...docs, ...docs],
        maxDocsCount: count * 5
    }
}
