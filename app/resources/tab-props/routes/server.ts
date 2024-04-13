"use server";
import { buildRoute } from "@/app/builder/route";
import { autoBuildState } from "@/app/components/top-bar/auto-build/server/state";
import {
    MakeAsDbDoc,
    MakeCreateOrUpdate,
    getCreateOrUpdateSchema,
} from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route/route";
import {
    GetRoute,
    SaveRoute,
    SaveRouteSchema,
} from "@/basic/models/route/types";
import { AppDataSource } from "@/db/init";
import { RouteModel, RouteTable } from "@/db/models/route";
import { ValidationModel } from "@/db/models/validation";
import { validate } from "@/utils";
import { InferAttributes, InferCreationAttributes, Model, ModelDefined } from "@sequelize/core";
// import { includes } from "lodash";
// import { Model } from "sequelize";

export async function SaveRouteDoc(
    value: MakeCreateOrUpdate<SaveRoute>
): Promise<void> {
    "use server";
    // console.log("🚀 --> SaveRouteDoc --> value:", value);
    const validateRes = validate(value, getCreateOrUpdateSchema(SaveRouteSchema));
    // console.log("🚀 --> SaveRouteDoc --> validateRes:", validateRes);

    if (!validateRes.error) {
        const { value } = validateRes;
        console.log("🚀 --> SaveRouteDoc --> value:", value.validations);

        const [instance, created] = await RouteModel.upsert(value);
        await instance.setValidations(value.validations.map((el) => el.id));

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
    console.log("🚀 --> AppDataSourc2312312e:");
    const UserRepository = AppDataSource.getRepository(RouteTable)
    console.log("🚀 --> UserRepository:", UserRepository);
    const res = UserRepository.findAndCount({
        where: {},
        take: endIndex - startIndex,
        skip: startIndex
    })
    // limit: endIndex - startIndex,
    // offset: startIndex,
    console.log("🚀 --> res:", res);
    // console.log("🚀 --> AppDataSource:", AppDataSource);
    const { rows, count } = await RouteModel.findAndCountAll({
        where: {},
        order: [["createdAt", "DESC"]],
        // include: [{ model: ValidationModel, as: 'validations' }],
        // include: [validationsAssociation],
        // include: ValidationModel,
        //  
        // include: {
        //     model: ValidationModel,
        //     as: 'validations',
        // },
        // attributes: { include: [[literal('COUNT(id)'), 'total']] 
        // attributes: ["validations"],
        // ["validations"],
        // attributes: ["id", "name", "path", "description", "method"],
        include: [{
            model: ValidationModel,
            as: "validations"
        }],
        // include: [RouteModel.associations.validations],
        limit: endIndex - startIndex,
        offset: startIndex,
        // raw: true, 
        // mapToModel: false
        // raw: true,
        // nest: true,
    } as const);

    // const ssss = await RouteModel.findAndCountAll(10, {
    //     include: [{ model: ValidationModel }],
    // })
    // console.log("🚀 --> getRouteDocs --> ssss:", ssss);
    // console.log("🚀 --> getRouteDocs --> rows:", rows);
    // const ourUser = await RouteModel.findByPk(1, {
    //     include: [RouteModel.associations.validations],
    //     rejectOnEmpty: true // Specifying true here removes `null` from the return type!
    // });
    // console.log("🚀 --> ourUser:", ourUser.getDataValue("id"));
    //   ourUser.dataValues.
    const docs: GetRoute[] = await Promise.all(rows.map(async (el) => {
        return {
            ...el.toJSON(),
            // validations: await el.getValidations()
        }
    }));
    // type ss = keyof (typeof docs)[number]
    console.log("🚀 --> getRouteDocs --> docs:", docs);
    // console.log("🚀 --> docs --> docs:", docs.map(e => e.validations));
    // console.log("🚀 --> getRouteDocs --> docs:", docs.map(el => el.validations.map(el => el.dataValuesf)));
    return {
        docs: docs,
        maxDocsCount: count,
    };
}
