// import { sequelize } from "../init";
// import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { Service } from "@/basic/models/services/services";
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class ServiceTable implements Service {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: Service["name"];

    @Column()
    description: Service["description"];


    @Column()
    methods: Service["methods"];

    //   @Column()
    //   name: string

    //   @Column()
    //   path: string

    //   @Column()
    //   method: RequestTypeEnum

    //   @Column()
    //   description: string

    @CreateDateColumn()
    declare createdAt: Date

    @UpdateDateColumn()
    declare updatedAt: Date

    @DeleteDateColumn()
    declare deletedAt: Date | null;
}


// @Table
// export class ServiceModel extends Model<InferAttributes<ServiceModel>, InferCreationAttributes<ServiceModel>> {
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