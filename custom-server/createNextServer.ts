
import next from "next";
import path from "path";
import { createServer } from "http";
import { electronMethods } from "./electron-methods";
import { getPort } from 'get-port-please';
import { parseYargs } from "./commands/parseYargs";
import { app as electronApp, BrowserView, BrowserWindow, shell } from "electron";
import { OpenWindow } from "./types";

export const createNextServer = async () => {
    const dirPath = path.resolve(path.join(__dirname, "../../../"));
    const yargs = await parseYargs()
    const dev = true;
    const hostname = "localhost";
    const port = await getPort();
    const app = next({
        dev: dev,
        port: port,
        dir: dirPath,
        hostname: hostname,
        customServer: true,
        isNodeDebugging: true,
    });


    const handle = app.getRequestHandler();

    app.prepare().then(() => {
        createServer((req, res) => {
            // console.log("🚀 --> createServer --> req:", req.method, req.url);
            const method = electronMethods?.[req.method ?? ""]?.[req.url ?? ""];
            if (method === undefined) {
                return handle(req, res)
            } else {
                return method(req, res)
            }
        })
            // .once("error", (err) => {
            //     console.error(err);
            //     process.exit(1);http://localhost:3000
            // })
            .listen(port, () => {
                const startPageUrl = `http://${hostname}:${port}/resources/routes`
                console.log(startPageUrl);
                if (yargs["open"] === OpenWindow.Browser) {
                    shell.openExternal(startPageUrl)
                    // open(startPageUrl);
                }
                if (yargs["open"] !== OpenWindow.Electron) {
                    return
                }
                electronApp.whenReady().then(() => {
                    const win = new BrowserWindow({
                        useContentSize: true,
                        autoHideMenuBar: true,
                        webPreferences: {
                            nodeIntegration: true
                        },
                        title: 'DBview'
                    });

                    const view = new BrowserView();
                    win.setBrowserView(view);
                    view.setBounds({ x: 0, y: 0, width: 800, height: 600 });
                    view.setAutoResize({ width: true, height: true });
                    view.webContents.loadURL(`http://${hostname}:${port}/resources?tab=Routes`);
                });

            });
    });


}