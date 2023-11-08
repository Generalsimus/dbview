import "reflect-metadata"
import { DataSource } from "typeorm"
import { Path } from "./models/path"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "dbView.db",
    entities: [
        Path
        // "./models/**/*. ts"
    ],
    synchronize: true,
    logging: false,
})


AppDataSource.initialize().then(() => {
    // console.log(v)
}).catch((error) => console.log(error))