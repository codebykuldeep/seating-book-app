import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import { Employees } from "./employees"

@Entity({
    name:'seats'
})
export class Seats extends BaseEntity {
    @PrimaryGeneratedColumn()
    seat_id: number

    @Column({
        type:'varchar',
        nullable:false
    })
    seat_no: string

    @Column({
        type:'date',
        nullable:false,
    })
    date: string

    @ManyToOne(() => Employees, (employee) => employee.emp_id)
    booked_by: Employees
}