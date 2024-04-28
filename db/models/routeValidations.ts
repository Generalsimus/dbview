import { requestMethods } from "@/basic/types";
import { Route } from "@/basic/models/route/route";
import { sequelize } from "../init";
import {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  BelongsToMany,
  Table,
  NotNull,
} from "@sequelize/core/decorators-legacy";
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  Association,
  NonAttribute,
  BelongsToManyAddAssociationsMixin,
} from "@sequelize/core";
import { ValidationModel } from "./validation";

@Table({ modelName: 'routeValidations' })
export class RouteValidationsModel extends Model<
  InferAttributes<RouteValidationsModel>,
  InferCreationAttributes<RouteValidationsModel>
> {
  @Attribute(DataTypes.INTEGER)
  @AutoIncrement
  @PrimaryKey
  declare id: CreationOptional<number>;



  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare routeId: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare validationId: number;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  @DeletedAt
  declare deletedAt: Date | null;
}
// console.log("🚀 --> sequelize:", RouteModel);

sequelize.addModels([RouteValidationsModel]);