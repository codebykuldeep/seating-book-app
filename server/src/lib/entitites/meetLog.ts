import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import { Employees } from "./employees"

@Entity({
    name:'meets_log'
})
export class MeetsLog extends BaseEntity {
    @PrimaryGeneratedColumn()
    meet_id: number

    @Column({
        type:'int',
        nullable:false
    })
    meet_no: number;


    @Column({
        type:'int',
        nullable:false
    })
    floor_no: number;

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

    @ManyToOne(() => Employees, (employee) => employee.emp_id,{eager:true})
    booked_by: Employees
}