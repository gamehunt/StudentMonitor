import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

const ProdDataSource = new DataSource({
    type: "postgres",
    host: "student-monitor-db",
    port: 5432,
    username: "student-monitor",
    password: "12345",
    database: "student-monitor",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
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
    entities: [User],
    migrations: [],
    subscribers: [],
})

export const AppDataSource = process.env.PROD ? ProdDataSource : DevDataSource
