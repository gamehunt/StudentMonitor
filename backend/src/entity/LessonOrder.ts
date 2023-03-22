import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Group } from "./Group"
import { JournalEntry } from "./JournalEntry"
import { Lesson } from "./Lesson"
import { User } from "./User"

@Entity()
export class LessonOrder {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    day: number

    @Column()
    order: number

    @Column()
    is_even: boolean

    @ManyToOne(type => Group, group => group.lessons)
    group: Group

    @ManyToOne(type => User, user => user.lessons)
    teacher: User

    @ManyToOne(type => Lesson, lesson => lesson.orders)
    lesson: Lesson

    @OneToMany(type => JournalEntry, entry => entry.lesson)
    entries: JournalEntry[]
}
