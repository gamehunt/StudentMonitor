import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { LessonOrder } from "./LessonOrder"
import { User } from "./User"

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(type => LessonOrder, lo => lo.lesson)
    orders: LessonOrder[]
}
