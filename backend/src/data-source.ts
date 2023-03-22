import "reflect-metadata"
import { DataSource } from "typeorm"
import { Group } from "./entity/Group";
import { JournalEntry } from "./entity/JournalEntry";
import { Lesson } from "./entity/Lesson";
import { LessonOrder } from "./entity/LessonOrder";
import { Role } from "./entity/Role"
import { Session } from "./entity/Session";
import { User } from "./entity/User"

const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;

const entities = [User, Role, Lesson, LessonOrder, Group, JournalEntry, Session]

const ProdDataSource = new DataSource({
    type: "postgres",
    host: "student-monitor-db",
    port: 5432,
    username: "student-monitor",
    password: "12345",
    database: "student-monitor",
    synchronize: true,
    logging: false,
    entities: entities,
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy()
})

const DevDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345",
    database: "student-monitor",
    synchronize: true,
    logging: false,
    entities: entities,
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy()
})

export const AppDataSource = process.env.PROD ? ProdDataSource : DevDataSource
