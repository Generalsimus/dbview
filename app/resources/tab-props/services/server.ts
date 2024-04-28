"use server";
import { MakeCreateOrUpdate, getCreateOrUpdateSchema } from "@/basic/db-basic-schema";
import { Service, ServiceSchema } from "@/basic/models/services/services";
import { ServiceModel } from "@/db/models/Service";
import { validate } from "@/utils";
import { map } from "lodash";
// sequelize
// console.log("🚀 --> sequelize:", sequelize);
export async function getServiceDocs(startIndex: number, endIndex: number) {
  "use server";
  const { rows, count } = await ServiceModel.findAndCountAll({
    where: {},
    order: [["createdAt", "DESC"]],
    limit: endIndex - startIndex,
    offset: startIndex,
  });

  return {
    docs: map(rows, "dataValues"),
    maxDocsCount: count,
  };
}

export async function saveServiceDoc(value: MakeCreateOrUpdate<Service>): Promise<void> {
  "use server";

  const validateRes = validate(value, getCreateOrUpdateSchema(ServiceSchema));

  if (!validateRes.error) {
    const { value } = validateRes;

    const [instance, created] = await ServiceModel.upsert(value);
  }
}

export async function deleteServiceDoc(id: number): Promise<void> {
  "use server";
  if (typeof id === "number") {
    await ServiceModel.destroy({
      where: {
        id: id,
      },
    });
  }
}
