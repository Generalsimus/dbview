// import { Validation } from "@/basic/models/validation/validation";
// import { sequelize } from "../init";
// import {
//     Attribute,
//     PrimaryKey,
//     AutoIncrement,
//     CreatedAt,
//     DeletedAt,
//     UpdatedAt,
//     Table,
// } from "@sequelize/core/decorators-legacy";
// import {
//     DataTypes,
//     Model,
//     InferAttributes,
//     InferCreationAttributes,
//     CreationOptional,
// } from "@sequelize/core";
 
// @Table({ modelName: 'validations' })
// export class ValidationModel extends Model<
//     InferAttributes<ValidationModel>,
//     InferCreationAttributes<ValidationModel>
// > {
//     @Attribute(DataTypes.INTEGER)
//     @AutoIncrement
//     @PrimaryKey
//     declare id: CreationOptional<number>;

//     // @BelongsToMany(() => RouteModel, {
//     //     through: {
//     //         model: "routeValidations",
//     //         paranoid: true,
//     //         unique: "id",
//     //     },
//     // })


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
