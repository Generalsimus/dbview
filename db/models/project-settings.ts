// import { sequelize } from "../init";
// import {  ModelDefined } from "sequelize";
// import { MakeAsDbDoc } from "@/basic/db-basic-schema";
// import { User } from "@/basic/models/user/user";
import { ProjectSetting } from "@/basic/models/project-settings/project-settings";
import { codeLanguages, CodeLanguagesEnum } from "@/basic/types";
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core';
import { PrimaryKey, Attribute, AutoIncrement, NotNull, HasMany, BelongsTo, Table } from '@sequelize/core/decorators-legacy';

@Table
export class ProjectSettingModel extends Model<InferAttributes<ProjectSettingModel>, InferCreationAttributes<ProjectSettingModel>> implements ProjectSetting {
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
}
ProjectSettingModel.sync({ force: true })