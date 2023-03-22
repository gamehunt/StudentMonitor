import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    permissions: number

    @OneToMany(type => User, user => user.role)
    users: User[]
}
