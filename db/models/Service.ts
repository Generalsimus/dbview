import { requestMethods } from "@/basic/types";
import { sequelize } from "../init";
import { DataTypes, ModelDefined } from "sequelize";
import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route/route";
import { Validation } from "@/basic/models/validation/validation";
import { Service } from "@/basic/models/services/services";



export const ServiceModel: ModelDefined<
    MakeAsDbDoc<Service>,
    {}
> = sequelize.define('service', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    methods: {
        type: DataTypes.JSON
    }
});
ServiceModel.sync({ alter: true })