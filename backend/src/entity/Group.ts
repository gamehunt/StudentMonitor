import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { LessonOrder } from "./LessonOrder"
import { User } from "./User"

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(type => LessonOrder, lo => lo.group)
    lessons: LessonOrder[]

    @OneToMany(type => User, user => user.group)
    students: User[]
}
