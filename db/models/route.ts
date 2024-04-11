import { requestMethods, RequestTypeEnum } from "@/basic/types";
import { ValidationModel } from "./validation";
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core';
import { PrimaryKey, Attribute, AutoIncrement, HasMany, Table } from '@sequelize/core/decorators-legacy';
import { Validation } from "@/basic/models/validation/validation";
// import { sequelize } from "../init";

// console.log("🚀 --> sequelize:", sequelize);
@Table
export class RouteModel extends Model<InferAttributes<RouteModel>, InferCreationAttributes<RouteModel>> {
  @Attribute(DataTypes.INTEGER)
  @AutoIncrement
  @PrimaryKey
  declare id: CreationOptional<number>;


  @Attribute(DataTypes.STRING(1234))
  declare name: string;


  @Attribute(DataTypes.STRING(1234))
  declare path: string;

  @Attribute(DataTypes.STRING(1234))
  declare description: string;

  @Attribute(DataTypes.ENUM(requestMethods))
  declare method: RequestTypeEnum;

  @HasMany(() => ValidationModel, /* foreign key */ 'id')
  declare validations?: NonAttribute<Validation[]>;
}
// RouteModel.sync({ force: true })sequelize
RouteModel.sync({ force: true })