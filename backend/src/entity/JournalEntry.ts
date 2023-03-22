import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { LessonOrder } from "./LessonOrder"
import { User } from "./User"

@Entity()
export class JournalEntry {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'date'})
    date: Date

    @ManyToOne(type => LessonOrder, lo => lo.entries)
    lesson: LessonOrder

    @ManyToOne(type => User, user => user.entries)
    student: User

    @Column()
    was: boolean

    @Column()
    mark: number
}
