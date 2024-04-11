// import { sequelize } from "../init";
// import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { Service } from "@/basic/models/services/services";
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core';
import { PrimaryKey, Attribute, AutoIncrement, NotNull, HasMany, BelongsTo, Table } from '@sequelize/core/decorators-legacy';



@Table
export class ServiceModel extends Model<InferAttributes<ServiceModel>, InferCreationAttributes<ServiceModel>> implements Service {
    @Attribute(DataTypes.INTEGER)
    @AutoIncrement
    @PrimaryKey
    declare id: CreationOptional<number>;


    @Attribute(DataTypes.STRING(1234))
    declare name: Service["name"];

    @Attribute(DataTypes.STRING(1234))
    declare description: Service["description"];


    @Attribute(DataTypes.JSON)
    declare methods: Service["methods"];
}
ServiceModel.sync({ force: true })