import { sequelize } from "../init";
import { DataTypes, ModelDefined } from "sequelize";
import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { User } from "@/basic/models/user/user";
import { ProjectSetting } from "@/basic/models/project-settings/project-settings";
import { codeLanguages } from "@/basic/types";



export const ProjectSettingModel: ModelDefined<
    MakeAsDbDoc<ProjectSetting>,
    {}
> = sequelize.define('projectSetting', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    backEndLanguage: {
        type: DataTypes.ENUM,
        values: codeLanguages,
        allowNull: true
    },
    backEndBuildDirection: {
        type: DataTypes.STRING(2234),
        allowNull: true
    },
    frontEndBuildDirection: {
        type: DataTypes.STRING(2234),
        allowNull: true
    },
});
ProjectSettingModel.sync({ alter: true })