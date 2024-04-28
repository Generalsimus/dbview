
import { ProjectSetting } from "@/basic/models/project-settings/project-settings";
import { codeLanguages } from "@/basic/types";
import { sequelize } from "../init";
import { Attribute, PrimaryKey, AutoIncrement, CreatedAt, DeletedAt, UpdatedAt, Table } from '@sequelize/core/decorators-legacy';
import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "@sequelize/core";


// console.log("🚀 --> sequelize:", sequelize);
// @Table
@Table({ modelName: 'projectSettings' })
export class ProjectSettingModel extends Model<InferAttributes<ProjectSettingModel>, InferCreationAttributes<ProjectSettingModel>> {
    @Attribute(DataTypes.INTEGER)
    @AutoIncrement
    @PrimaryKey
    declare id: CreationOptional<number>;


    @Attribute(DataTypes.ENUM(codeLanguages))
    declare backEndLanguage: ProjectSetting["backEndLanguage"];


    @Attribute(DataTypes.STRING(1234))
    declare backEndBuildDirection: ProjectSetting["backEndBuildDirection"];

    @Attribute(DataTypes.STRING(1234))
    declare frontEndBuildDirection: ProjectSetting["frontEndBuildDirection"];

    @CreatedAt
    declare createdAt: CreationOptional<Date>;

    @UpdatedAt
    declare updatedAt: CreationOptional<Date>;

    @DeletedAt
    declare deletedAt: Date | null;
}

sequelize.addModels([ProjectSettingModel]); 