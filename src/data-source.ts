import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "catalog_db",
    synchronize: true,
    logging: true,
    entities: [
        "src/entity/**/*.ts"
    ],
    migrations: [],
    subscribers: [],
})
