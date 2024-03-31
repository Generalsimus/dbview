import { ProjectSettingModel } from "@/db/models/project-setings"







export const runBuild = () => {
    const projectSettings = ProjectSettingModel.findOne()
    console.log("🚀 --> runBuild --> projectSettings:", projectSettings);
}