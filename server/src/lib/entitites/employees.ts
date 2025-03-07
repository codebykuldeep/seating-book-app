import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Employees extends BaseEntity {
    @PrimaryGeneratedColumn()
    emp_id: number

    @Column({
        type:'varchar',
        nullable:false
    })
    name: string

    @Column({
        type:'varchar',
        nullable:false,
        unique:true,
    })
    email: string

    // @Column({
    //     type:'varchar',
    //     nullable:true,
    // })
    // password: string

}