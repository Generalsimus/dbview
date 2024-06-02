"use server"

import { ProjectSettingSchema } from "@/app/settings/schema";
import { MakeCreateOrUpdate, getCreateOrUpdateSchema } from "@/utils/db-basic-schema"; 
import { db } from "@/db/init";
import { ProjectSettings } from "@/db/types";
import { validate } from "@/utils";



export async function SaveProjectSettingsDoc(value: MakeCreateOrUpdate<ProjectSettings>): Promise<void> {
    'use server'
    const validateRes = validate(value, getCreateOrUpdateSchema(ProjectSettingSchema))

    if (!validateRes.error) {
        const { value } = validateRes;

        const result = await db.insertInto("ProjectSettings")
            .columns(["backEndBuildDirection", "backEndLanguage", "frontEndBuildDirection"])
            .values({
                backEndBuildDirection: value.backEndBuildDirection,
                backEndLanguage: value.backEndLanguage,
                frontEndBuildDirection: value.frontEndBuildDirection,
                updatedAt: new Date().toString()
            })
            .executeTakeFirst()
        // .expression((eb) => eb
        //     .selectFrom('pet')
        //     .select((eb) => [
        //         'pet.name',
        //         eb.val('Petson').as('last_name'),
        //         eb.lit(7).as('age'),
        //     ])
        // )
        // .execute()

        // const [instance, created] = await ProjectSettingModel.upsert(value);
        // DEFAULT_MIGRATION_LOCK_TABLE
        // await client.projectSettings.upsert({
        //     where: {
        //         email: 'viola@prisma.io',
        //     } as any,
        //     update: value,
        //     create: value
        // })

    }

};

export async function GetProjectSettings() {
    'use server'
    // const doc = await ProjectSettingModel.findOne({
    //     where: {},
    //     // order: [
    //     //     ['createdAt', 'DESC']
    //     // ],
    //     // limit: endIndex - startIndex,
    //     // offset: startIndex
    // })

    // return doc?.dataValues as 
    return null as any
}
