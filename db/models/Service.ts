// // import { sequelize } from "../init";
// // import { MakeAsDbDoc } from "@/basic/db-basic-schema";
// import { Service } from "@/basic/models/services/services";
// import { sequelize } from "../init";
// import {
//     Attribute,
//     PrimaryKey,
//     AutoIncrement,
//     NotNull,
//     Table,
//     CreatedAt,
//     DeletedAt,
//     UpdatedAt,
// } from "@sequelize/core/decorators-legacy";
// import {
//     DataTypes,
//     Model,
//     InferAttributes,
//     InferCreationAttributes,
//     CreationOptional,
// } from "@sequelize/core";

// @Table({ modelName: 'services' })
// export class ServiceModel extends Model<
//     InferAttributes<ServiceModel>,
//     InferCreationAttributes<ServiceModel>
// > {
//     @Attribute(DataTypes.INTEGER)
//     @AutoIncrement
//     @PrimaryKey
//     declare id: CreationOptional<number>;

//     @Attribute(DataTypes.STRING(1234))
//     declare name: Service["name"];

//     @Attribute(DataTypes.STRING(1234))
//     declare description: Service["description"];

//     @Attribute(DataTypes.JSON)
//     declare methods: Service["methods"];

//     @CreatedAt
//     declare createdAt: CreationOptional<Date>;

//     @UpdatedAt
//     declare updatedAt: CreationOptional<Date>;

//     @DeletedAt
//     declare deletedAt: Date | null;
// }
// sequelize.addModels([ServiceModel]);
