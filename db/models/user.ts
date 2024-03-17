import { sequelize } from "../init";
import { DataTypes, ModelDefined } from "sequelize";
import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { User } from "@/basic/models/user/user";



export const UserModel: ModelDefined<
    MakeAsDbDoc<User>,
    {}
> = sequelize.define('service', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
});
UserModel.sync({ alter: true })