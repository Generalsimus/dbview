import { RequestTypeEnum } from "@/basic/types";
import { Route } from "@/basic/models/route/route";
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class RouteTable implements Route {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  path: string

  @Column()
  method: RequestTypeEnum

  @Column()
  description: string

  @CreateDateColumn()
  declare createdAt: Date

  @UpdateDateColumn()
  declare updatedAt: Date

  @DeleteDateColumn()
  declare deletedAt: Date | null;
}
// AppDataSource.s
// import { sequelize } from "../init";

// console.log("🚀 --> sequelize:", sequelize);@Table({ timestamps: false })
// @Table
// export class RouteModel extends Model<InferAttributes<RouteModel, {}>, InferCreationAttributes<RouteModel, {}>> {
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

//   @HasMany(() => ValidationModel, {
//     through: {
//       model: 'routeValidations',
//       unique: true,
//     },
//   })
//   // declare validations: CreationOptional<ValidationModel[]>;
//   declare validations: NonAttribute<ValidationModel[]>;
//   declare getValidations: BelongsToManyGetAssociationsMixin<ValidationModel>;
//   declare setValidations: BelongsToManySetAssociationsMixin<
//     ValidationModel,
//     /* this is the type of the primary key of the target */
//     ValidationModel['id']
//   >;
//   // public static associations: {
//   //   validations: Association<RouteModel, ValidationModel>;
//   // };

//   @CreatedAt
//   declare createdAt: CreationOptional<Date>;

//   @UpdatedAt
//   declare updatedAt: CreationOptional<Date>;

//   @DeletedAt
//   declare deletedAt: Date | null;

//   declare static associations: {
//     validations: Association<RouteModel, ValidationModel>;
//   };
// }
// sequelize.addModels([RouteModel]);
// RouteModel.sync({ force: true })sequelize
// RouteModel.sync({ force: true })