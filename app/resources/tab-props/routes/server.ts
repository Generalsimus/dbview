"use server";
import { buildRoute } from "@/app/builder/route";
import { autoBuildState } from "@/app/components/top-bar/auto-build/server/state";
import {
    MakeAsDbDoc,
    MakeCreateOrUpdate,
    getCreateOrUpdateSchema,
} from "@/basic/db-basic-schema";
import {
    GetRoute,
    SaveRoute,
    SaveRouteSchema,
} from "@/basic/models/route/types";
import { RouteModel } from "@/db/models/route";
import { ValidationModel } from "@/db/models/validation";
import { validate } from "@/utils";
// import { includes } from "lodash";
// import { Model } from "sequelize";

export async function SaveRouteDoc(
    value: MakeCreateOrUpdate<SaveRoute>
): Promise<void> {
    "use server";
    // console.log("🚀 --> SaveRouteDoc --> value:", value);
    const validateRes = validate(value, getCreateOrUpdateSchema(SaveRouteSchema));
    console.log("🚀 --> SaveRouteDoc --> validateRes:", validateRes);

    if (!validateRes.error) {
        const { value } = validateRes;
        console.log("🚀 --> SaveRouteDoc --> value:", value.validations);

        const [instance, created] = await RouteModel.upsert({
            ...value,
            //     {
            //         model: ValidationModel,
            //         as: "validations"
            //     }
            // ],
        });
        // await instance.addValidation(...value.validations.map((el) => el.id));

        // await instance.setValidations(value.validations, {})
        // await instance.update({ validations: value.validations })
        // instance.
        // instance.belongsTo()
        // .ad(value.validations[0]);
        // await Promise.all(value.validations.map(async (el) => {
        //     const validation = await ValidationModel.upsert(el);
        //     await instance.addValidation(validation, { through: { selfGranted: false } });
        // }))
        // instance.belongsToMany(created)
        // Player.belongsTo(Team);
        // validateRes.addRefe
        buildRoute(instance.dataValues);
    }
}

export async function DeleteRouteDoc(id: number): Promise<void> {
    "use server";
    if (typeof id === "number") {
        await RouteModel.destroy({
            where: {
                id: id,
            },
        });
    }
}

export async function getRouteDocs(startIndex: number, endIndex: number) {
    "use server";
    const { rows, count } = await RouteModel.findAndCountAll({
        where: {},
        order: [["createdAt", "DESC"]],
        // include: [{ model: ValidationModel, as: 'validations' }],
        // include: [validationsAssociation],
        // include: ValidationModel,

        // include: ["validations"],
        // include: [{
        //     model: ValidationModel,
        //     as: "routeValidations"
        // }],
        limit: endIndex - startIndex,
        offset: startIndex,
        raw: true,
        nest: true,
    });
    console.log("🚀 --> getRouteDocs --> rows:", rows);

    const docs = rows.map((el) => el);
    console.log("🚀 --> getRouteDocs --> docs:", docs);
    // console.log("🚀 --> docs --> docs:", docs);
    // console.log("🚀 --> getRouteDocs --> docs:", docs.map(el => el.validations.map(el => el.dataValuesf)));
    return {
        docs: docs,
        maxDocsCount: count,
    };
}
