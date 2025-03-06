import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm"
import { Employees } from "./employees";


export enum BookStatus {
    NONE = "",
    SELECT = "SELECTED",
    BOOK = "BOOKED",
}

@Entity({
    name:'seats'
})
export class Seats extends BaseEntity {
    @PrimaryGeneratedColumn()
    seat_no: number

    @Column({
        type:'int',
        nullable:false
    })
    floor_no: number

    @Column({
        type:'enum',
        enum:BookStatus,
        default:BookStatus.NONE,
        name:'book_status'
    })
    book_status: BookStatus


    @OneToOne(() => Employees,{nullable:true,eager:true})
    @JoinColumn(
        {
            name:'emp_id',
        }
    )
    employee: Employees | null
}