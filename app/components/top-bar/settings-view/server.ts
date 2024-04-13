"use server"
 
import { MakeCreateOrUpdate, getCreateOrUpdateSchema } from "@/basic/db-basic-schema";
import { ProjectSetting, ProjectSettingSchema } from "@/basic/models/project-settings/project-settings";
import { ProjectSettingModel } from "@/db/models/project-settings";
import { RouteModel } from "@/db/models/route";
import { validate } from "@/utils";

export async function SaveProjectSettingsDoc(value: MakeCreateOrUpdate<ProjectSetting>): Promise<void> {
    'use server'
    const validateRes = validate(value, getCreateOrUpdateSchema(ProjectSettingSchema))
    console.log("🚀 --> SaveProjectSettingsDoc --> validateRes:", validateRes);
    // console.log({ validateRes</void> })
    if (!validateRes.error) {
        const { value } = validateRes;

        const [instance, created] = await ProjectSettingModel.upsert(value);

    }

};

export async function GetProjectSettings() {
    'use server'
    const doc = await ProjectSettingModel.findOne({
        where: {},
        // order: [
        //     ['createdAt', 'DESC']
        // ],
        // limit: endIndex - startIndex,
        // offset: startIndex
    })

    return doc?.dataValues
}
