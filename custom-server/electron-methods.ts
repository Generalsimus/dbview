import { IncomingMessage, ServerResponse } from "http"
import { dialog } from "electron"
// var remote = require('remote');
// var dialog = remote.require('electron').dialog;


type Methods = string
// let isAlreadyOpened = false;
export const electronMethods: Record<Methods, Record<string, (req: IncomingMessage, res: ServerResponse) => void> | undefined> = {
    GET: {
        "/open-directory-dialog": async (req, res) => {
            try {
                var path = await dialog.showOpenDialog({
                    properties: ['openDirectory'],
                })
                console.log("🚀 -->  : --> path:", path);

                res.end(path.filePaths[0] ?? "")

            } catch (error) {
                res.end("")
            }
        }
    }
} 