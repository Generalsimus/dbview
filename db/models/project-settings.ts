
import { ProjectSetting } from "@/basic/models/project-settings/project-settings";
import { codeLanguages, CodeLanguagesEnum } from "@/basic/types";
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class ProjectSettingTable implements ProjectSetting {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: codeLanguages,
    })
    backEndLanguage: CodeLanguagesEnum | null;

    @Column()
    backEndBuildDirection: ProjectSetting["backEndBuildDirection"];

    @Column()
    frontEndBuildDirection: ProjectSetting["frontEndBuildDirection"];

    //   @Column()
    //   name: string

    //   @Column()
    //   path: string

    //   @Column()
    //   method: RequestTypeEnum

    //   @Column()
    //   description: string

    @CreateDateColumn()
    declare createdAt: Date

    @UpdateDateColumn()
    declare updatedAt: Date

    @DeleteDateColumn()
    declare deletedAt: Date | null;
}
@Table
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