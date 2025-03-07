import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import { Employees } from "./employees"

@Entity({
    name:'seats_log'
})
export class SeatsLog extends BaseEntity {
    @PrimaryGeneratedColumn()
    seat_id: number

    @Column({
        type:'int',
        nullable:false
    })
    seat_no: number

    @Column({
        type:'date',
        nullable:false,
    })
    date: string

    @ManyToOne(() => Employees, (employee) => employee.emp_id,{eager:true})
    booked_by: Employees
}