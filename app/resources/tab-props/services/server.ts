"use server"
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema"
import { Service } from "@/basic/models/services/services"
import { ServiceModel } from "@/db/models/Service"

export async function saveServiceDoc(value: MakeCreateOrUpdate<Service>): Promise<void> {
    'use server'

}
export async function deleteServiceDoc(id: number): Promise<void> {
    'use server'
}



export async function getServiceDocs(startIndex: number, endIndex: number) {
    const { rows, count } = await ServiceModel.findAndCountAll({
        where: {},
        order: [
            ['createdAt', 'DESC']
        ],
        limit: endIndex - startIndex,
        offset: startIndex
    })

    return {
        docs: rows.map(el => el.dataValues),
        maxDocsCount: count
    }
}
