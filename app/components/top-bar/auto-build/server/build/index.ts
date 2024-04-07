import { ProjectSettingModel } from "@/db/models/project-settings"







export const runBuild = () => {
    const projectSettings = ProjectSettingModel.findOne()
    console.log("🚀 --> runBuild --> projectSettings:", projectSettings);
}