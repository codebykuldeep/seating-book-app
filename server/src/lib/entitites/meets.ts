import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import { Employees } from "./employees"

@Entity({
    name:'meets'
})
export class Meets extends BaseEntity {
    @PrimaryGeneratedColumn()
    meet_id: number

    @Column({
        type:'varchar',
        nullable:false
    })
    meet_no: string

    @Column({
        type:'date',
        nullable:false,
    })
    date: string


    @Column({
        type:'time',
        nullable:false,
    })
    start_time: string


    @Column({
        type:'time',
        nullable:false,
    })
    end_time: string

    @ManyToOne(() => Employees, (employee) => employee.emp_id)
    booked_by: Employees
}