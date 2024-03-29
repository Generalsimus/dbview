import { sequelize } from "../init";
import { DataTypes, ModelDefined } from "sequelize";
import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { User } from "@/basic/models/user/user";
import { ProjectSetting } from "@/basic/models/project-settings/project-settings";



export const ProjectSettingModel: ModelDefined<
    MakeAsDbDoc<ProjectSetting>,
    {}
> = sequelize.define('projectSetting', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    buildDirection: {
        type: DataTypes.STRING(1234),
        allowNull: true
    },
});
ProjectSettingModel.sync({ alter: true })