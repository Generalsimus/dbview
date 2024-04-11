// import { sequelize } from "../init";
// // import { ModelDefined } from "sequelize";
import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { Validation } from "@/basic/models/validation/validation";
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core';
import { PrimaryKey, Attribute, AutoIncrement, NotNull, HasMany, BelongsTo, Table } from '@sequelize/core/decorators-legacy';


@Table
export class ValidationModel extends Model<InferAttributes<ValidationModel>, InferCreationAttributes<ValidationModel>> implements Validation {
    @Attribute(DataTypes.INTEGER)
    @AutoIncrement
    @PrimaryKey
    declare id: CreationOptional<number>;


    @Attribute(DataTypes.STRING(1234))
    declare name: Validation["name"];

    @Attribute(DataTypes.STRING(1234))
    declare description: Validation["description"];


    @Attribute(DataTypes.JSON)
    declare validations: Validation["validations"];

}
ValidationModel.sync({ force: true })
// export const ValidationModel: ModelDefined<
//     MakeAsDbDoc<Validation>,
//     {}
// > = sequelize.define('validation', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     name: {
//         type: DataTypes.STRING(1234),
//         allowNull: false
//     },
//     description: {
//         type: DataTypes.STRING(1234),
//         allowNull: false
//     },
//     validations: {
//         type: DataTypes.JSON
//     }
// });
//
// ValidationModel.sync({ alter: true })