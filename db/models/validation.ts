// import { sequelize } from "../init";
// // import { ModelDefined } from "sequelize";
import { Validation } from "@/basic/models/validation/validation";
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class ValidationTable implements Validation {
    @PrimaryGeneratedColumn()
    id: number


    @Column()
    name: Validation["name"];

    @Column()
    description: Validation["description"];


    @Column()
    validations: Validation["validations"];

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

// @Table
// export class ValidationModel extends Model<InferAttributes<ValidationModel>, InferCreationAttributes<ValidationModel>> {
//     @Attribute(DataTypes.INTEGER)
//     @AutoIncrement
//     @PrimaryKey
//     declare id: CreationOptional<number>;


//     @Attribute(DataTypes.STRING(1234))
//     declare name: Validation["name"];

//     @Attribute(DataTypes.STRING(1234))
//     declare description: Validation["description"];


//     @Attribute(DataTypes.JSON)
//     declare validations: Validation["validations"];

//     @CreatedAt
//     declare createdAt: CreationOptional<Date>;

//     @UpdatedAt
//     declare updatedAt: CreationOptional<Date>;

//     @DeletedAt
//     declare deletedAt: Date | null;
// }
// sequelize.addModels([ValidationModel]);
// // export const ValidationModel: ModelDefined<
// //     MakeAsDbDoc<Validation>,
// //     {}
// // > = sequelize.define('validation', {
// //     id: {
// //         type: DataTypes.INTEGER,
// //         autoIncrement: true,
// //         primaryKey: true
// //     },
// //     name: {
// //         type: DataTypes.STRING(1234),
// //         allowNull: false
// //     },
// //     description: {
// //         type: DataTypes.STRING(1234),
// //         allowNull: false
// //     },
// //     validations: {
// //         type: DataTypes.JSON
// //     }
// // });
// //
// // ValidationModel.sync({ alter: true })