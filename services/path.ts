"use server"
import { AppDataSource } from "@/db/init";
import { Path } from "@/db/models/path";
import { FindOptionsWhere } from "typeorm";


export const find = async (args: {
    ware: FindOptionsWhere<Path> | FindOptionsWhere<Path>[]
    page: number
    docsCount: number
}) => {
    const pathRepository = AppDataSource.getRepository(Path)
    const [pathDoc, total] = await pathRepository.findAndCount({
        where: args.ware,
        take: args.docsCount,
        skip: (args.page - 1) * args.docsCount
    });


    // if (pathDoc == null) {
    //     throw new NotFoundResource("PATH Document NOT FOUNT");
    // }

    return {
        items: pathDoc,
        page: args.page,
        itemsDefaultSize: args.docsCount,
        maxPage: Math.ceil(total / args.docsCount),
    }
}