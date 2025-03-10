import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn } from "typeorm"
import { Employees } from "./employees"
import { BookStatus } from "./seats"

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

    @Column({
        type:'enum',
        enum:BookStatus,
        default:BookStatus.NONE,
        name:'book_status'
    })
    book_status: BookStatus

    @CreateDateColumn()
    created_at:string;


    @ManyToOne(() => Employees, (employee) => employee.emp_id,{eager:true})
    booked_by: Employees
}