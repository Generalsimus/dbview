import fs from "fs"
import path from "path"
import { mkFullDir } from "./mkFullDir"


export const writeFileSync = (filePath: string, fileContent: string) => {
    mkFullDir(filePath);

    fs.writeFileSync(filePath, fileContent);
}