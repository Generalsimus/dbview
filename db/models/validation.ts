import { requestMethods } from "@/basic/request";
import { sequelize } from "../init";
import { DataTypes, ModelDefined } from "sequelize";
import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route/route";
import { Validation } from "@/basic/models/validation/validation";



export const ValidationModel: ModelDefined<
    MakeAsDbDoc<Validation>,
    {}
> = sequelize.define('validation', {
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
    validations: {
        type: DataTypes.JSON 
    }
});
ValidationModel.sync({ alter: true })