import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Group } from "./Group"
import { JournalEntry } from "./JournalEntry"
import { LessonOrder } from "./LessonOrder"
import { Role } from "./Role"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Role, role => role.users)
    role: Role

    @Column()
    fio: string

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @ManyToOne(type => Group, group => group.students)
    group: Group

    @OneToMany(type => LessonOrder, lesson => lesson.teacher)
    lessons: LessonOrder[]

    @OneToMany(type => JournalEntry, entry => entry.student)
    entries: JournalEntry[]
}
