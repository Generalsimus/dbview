"use server";
// import { ValidationModel } from "@/db/models/validation";
import {
  MakeCreateOrUpdate,
  getCreateOrUpdateSchema,
} from "@/basic/db-basic-schema";
import {
  // Validation,
  ValidationSchema,
} from "@/basic/models/validation/validation";
import { validate } from "@/utils";
// import { Op, sql } from "@sequelize/core";
import { map } from "lodash";
import { getBuilder } from "@/syncCode";
import { Validation } from "@/db/types";

// console.log("🚀 --> sequelize:", sequelize);
export async function getValidations(startIndex: number, endIndex: number) {
  "use server";
  // const { rows, count } = await ValidationModel.findAndCountAll({
  //   where: {},
  //   order: [["createdAt", "DESC"]],
  //   limit: endIndex - startIndex,
  //   offset: startIndex,
  // });

  return {
    docs: [],
    // map(rows, "dataValues"),
    maxDocsCount: 0,
  };
}

export async function SaveValidationDoc(
  value: MakeCreateOrUpdate<Validation>
): Promise<void> {
  "use server";
  // console.log(value)
  const validateRes = validate(
    value,
    getCreateOrUpdateSchema(ValidationSchema)
  );
  // console.log({ validateRes ,value})
  if (!validateRes.error) {
    const { value } = validateRes;
    
    
    // const [instance, created] = await ValidationModel.upsert(value);
    // console.log("🚀 --> instance:", { instance, created });

    // const builder = await getBuilder();

    // builder?.buildValidation(instance);
    // builder?.buildRoute({
    //   ...instance.dataValues,
    //   validations: await instance.getValidations({ raw: true })
    // });
  }
}
export async function DeleteValidationDoc(id: number): Promise<void> {
  "use server";
  // if (typeof id === "number") {
  //   await ValidationModel.destroy({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }
}
export async function SearchValidationsByName(
  startIndex: number,
  endIndex: number,
  search?: string
) {
  "use server";
  // console.log("🚀 --> search:", `%${search?.trim().split(/\s+/gm).join("%")}%`);
  // console.log("🚀 --> startIndex:", startIndex);
  // console.log("🚀 --> endIndex:", endIndex);
  // const { rows, count } = await ValidationModel.findAndCountAll({
  //   where: search
  //     ? sql.where(
  //       sql.fn("lower", sql.col("name")),
  //       Op.like,
  //       `%${search?.trim().toLowerCase().split(/\s+/gm).join("%")}%`
  //     )
  //     : {},
  //   order: [["createdAt", "DESC"]],
  //   limit: endIndex - startIndex,
  //   offset: startIndex,
  // });

  return {
    docs: [],
    // map(rows, "dataValues"),
    maxDocsCount: 0,
  };
}


