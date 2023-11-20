import { requestMethods } from "@/basic/request";
import { sequelize } from "../init";
import { DataTypes, ModelDefined } from "sequelize";
import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route/route";



export const RouteModel: ModelDefined<
    MakeAsDbDoc<Route>,
    {}
> = sequelize.define('path', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    path: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    method: {
        type: DataTypes.ENUM,
        values: requestMethods
    }
});
RouteModel.sync({ alter: true })