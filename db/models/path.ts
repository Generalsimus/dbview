import { PathValidation } from "@/types/models/path";
import { RequestTypeEnum, requestMethods } from "@/types/request";
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, DeleteDateColumn } from "typeorm"
import { AppDataSource } from "../init";
import { BaseEntity } from "typeorm";
import { CreateDateColumn } from "typeorm";
import { ClassToObject } from "@/types/generics";

@Entity()
export class Path extends BaseEntity implements ClassToObject<typeof PathValidation> {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    path: string;

    @Column()
    description: string;

    @Column({
        type: "varchar",
        enum: requestMethods,
    })
    method: RequestTypeEnum;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date
}

export default Path