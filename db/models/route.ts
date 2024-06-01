// import { requestMethods } from "@/basic/types";
// import { Route } from "@/basic/models/route/route";
// import { sequelize } from "../init";
// import {
//   Attribute,
//   PrimaryKey,
//   AutoIncrement,
//   CreatedAt,
//   DeletedAt,
//   UpdatedAt,
//   BelongsToMany,
//   Table,
// } from "@sequelize/core/decorators-legacy";
// import {
//   DataTypes,
//   Model,
//   InferAttributes,
//   InferCreationAttributes,
//   CreationOptional,
//   BelongsToManyGetAssociationsMixin,
//   BelongsToManySetAssociationsMixin,
//   Association,
//   NonAttribute,
//   BelongsToManyAddAssociationsMixin,
// } from "@sequelize/core";
// import { ValidationModel } from "./validation";
// import { RouteValidationsModel } from "./routeValidations";

// @Table({ modelName: "routes" })
// export class RouteModel extends Model<
//   InferAttributes<RouteModel>,
//   InferCreationAttributes<RouteModel>
// > {
//   @Attribute(DataTypes.INTEGER)
//   @AutoIncrement
//   @PrimaryKey
//   declare id: CreationOptional<number>;

//   @Attribute(DataTypes.STRING(1234))
//   declare name: Route["name"];

//   @Attribute(DataTypes.STRING(1234))
//   declare path: Route["path"];

//   @Attribute(DataTypes.STRING(1234))
//   declare description: Route["description"];

//   @Attribute(DataTypes.ENUM(requestMethods))
//   declare method: Route["method"];

//   @BelongsToMany(() => ValidationModel, {
//     through: {
//       model: () => RouteValidationsModel,
//       paranoid: true,
//       timestamps: true,
//     },
//     foreignKey: "routeId",
//     otherKey: "validationId",
//   })
//   declare validations: NonAttribute<ValidationModel[]>;
//   declare getValidations: BelongsToManyGetAssociationsMixin<ValidationModel>;
//   declare setValidations: BelongsToManySetAssociationsMixin<
//     ValidationModel,
//     ValidationModel["id"]
//   >;

//   @CreatedAt
//   declare createdAt: CreationOptional<Date>;

//   @UpdatedAt
//   declare updatedAt: CreationOptional<Date>;

//   @DeletedAt
//   declare deletedAt: Date | null;
// }

// sequelize.addModels([RouteModel]);
