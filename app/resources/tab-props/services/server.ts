"use server";
import { MakeCreate, MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Service } from "@/basic/models/services/services";
import { ServiceModel } from "@/db/models/Service";

export async function saveServiceDoc(
  value: MakeCreateOrUpdate<Service>
): Promise<void> {
  "use server";
}
export async function deleteServiceDoc(id: number): Promise<void> {
  "use server";
}

export async function getServiceDocs(startIndex: number, endIndex: number) {
  const { rows, count } = await ServiceModel.findAndCountAll({
    where: {},
    order: [["createdAt", "DESC"]],
    limit: endIndex - startIndex,
    offset: startIndex,
  });

  const fakeDocs: MakeCreate<Service>[] = Array.from({ length: 10 }, () => {
    return {
      name: "string string",
      description: "string description",
      methods: Array.from({ length: 15 }, () => {
        return {
          name: "name_____name",
          descriptions: "descriptions___descriptions",
          argValidationIds: [1, 3, 5],
          actionCode: `function EDIT(){}`,
        };
      }),
      //   name: string,
      // descriptions: string,
      // argValidationIds: number[],
      // actionCode: string

      //   ServiceMethod[]
    };
  });

  return {
    docs: fakeDocs,
    maxDocsCount: 2000,
  };
  //   return {
  //     docs: rows.map((el) => el.dataValues),
  //     maxDocsCount: count,
  //   };
}
