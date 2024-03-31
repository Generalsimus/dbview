#!/usr/bin/env node

import { toRgb } from "colby";
import { ChildProcess, spawn } from "child_process";
import path from "path"
import electronPath from "electron";
import { OpenWindow } from "./types";
// const argv = yargs(hideBin(process.argv)).argv
// console.log("🚀 --> aasargv:", argv);

// (async () => {

//   const args = await parseYargs();
//   switch (args._[0]) {
//     case "new":



//   }

//   console.log("🚀 --> argsss:", args);
// })();
// readCommandsAndRun();
// createNextServer()
// const bash = process.platform === "win32" ? path.join((process.env as any)["ProgramW6432"], "Git", "usr", "bin", "bash.exe") : true;
// console.log("🚀 --> bash:", bash);

// spawn(`npm exec --call "npm run electron"`, {
//     shell: bash,
//     cwd: path.join(__dirname, "../../../"),
//     stdio: "inherit",
//     // "stdio": ["inherit", "pipe", "pipe"]

// });
// // @ts-ignore
// return null as any;
var stdin = process.stdin;
// // utilityutilityProcess.stdout
// // without this, we would only get streams once enter is pressed 
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}
// // resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// // i don't want binary, do you?
stdin.setEncoding("utf-8");

const blueColor = toRgb(0, 0, 255)
const cyanColor = toRgb(0, 255, 255)
// color: rgb(0 0 255);
//     color: rgb(0 255 255);
const getConsoleMessage = () => {
    return `\x1B[2J\x1B[3J\x1B[H${cyanColor(`
  ██████╗ ██████╗ ██╗   ██╗██╗███████╗██╗    ██╗
  ██╔══██╗██╔══██╗██║   ██║██║██╔════╝██║    ██║
  ██║  ██║██████╔╝██║   ██║██║█████╗  ██║ █╗ ██║
  ██║  ██║██╔══██╗╚██╗ ██╔╝██║██╔══╝  ██║███╗██║
  ██████╔╝██████╔╝ ╚████╔╝ ██║███████╗╚███╔███╔╝      
 `)} \n  b - Open In Browser.\n  e - Open In Electron.\n\n`
    //  .split('').map(char => char.charCodeAt(0)).join(" ");
    //  console.log("🚀 --> getConsoleMessage --> key:", key);
};

process.stdout.write(getConsoleMessage());


let electronProcess: ChildProcess | undefined;

stdin.on("data", function (keyBuff) {
    const key = keyBuff.toString()
    if (key === "\u0003") {
        electronProcess?.kill();
        process.exit();
    }
    switch (key) {
        case "b":
            process.stdout.write(getConsoleMessage());
            process.stdout.write(cyanColor(`b - Open In Browser\n`));
            electronProcess?.kill();
            electronProcess = spawn(`${electronPath}`, [path.join(__dirname, "./startApp.js"), `--open=${OpenWindow.Browser}`, ...process.argv.slice(2)], {
                cwd: process.cwd(),
                stdio: "inherit",
            });
            break;
        // e - Open In Electron.
        case "e":
            process.stdout.write(getConsoleMessage());
            process.stdout.write(cyanColor(`e - Open In Electron.\n`));
            electronProcess?.kill();
            electronProcess = spawn(`${electronPath}`, [path.join(__dirname, "./startApp.js"), `--open=${OpenWindow.Electron}`, ...process.argv.slice(2)], {
                cwd: process.cwd(),
                stdio: "inherit",
            });
            break;
        default:
            return
    }

    // console.log("🚀 --> key:", key);
    // console.log("🚀 --> electronProcess --> __dirname:", path.join(__dirname, "./startApp.js"));
    // console.log("🚀 --> electronProcess --> __dirname:", path.join(__dirname, "../../../"));

    // electronProcess.s
    // var cleanExit = function () { process.exit() };
    // electronProcess.on('SIGINT', cleanExit); // catch ctrl-c
    // electronProcess.on('SIGTERM', cleanExit); // catch kill
    // electronProcess.on("exit", cleanExit); // catch kill
    // spawn("electron", [path.join(__dirname, "./startApp.js"), ...process.argv.slice(2)], {
    //     shell: true,
    //     cwd: process.cwd(),
    //     stdio: 'inherit'
    // })
    // .on("error", log.error);
    // electronProce/ss.
});
// /////////////////////////////////////////////////////////////////////

// export const openDialoger = () => {

//   dialog.showOpenDialog({ properties: ['openDirectory'] })
//     .then(result => {
//       console.log(result.filePaths)
//     })
// }
// const dirPath = path.resolve(path.join(__dirname, "../../"));

// console.log("🚀 --> dirPath:", dirPath);
// // console.log("🚀 --> BrowserWindow:", BrowserWindow);
// const dev = true;
// const hostname = "localhost";
// const port = 3000;
// const app = next({
//   dev: dev,
//   port: port,
//   dir: dirPath,
//   hostname: hostname,
//   customServer: true,
//   isNodeDebugging: true,
// });

// console.log("🚀 --> appr:", app);


// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   createServer((req, res) => {
//     // console.log("🚀 --> createServer --> req:", req.method, req.url);
//     const method = electronMethods?.[req.method ?? ""]?.[req.url ?? ""];
//     if (method === undefined) {
//       return handle(req, res)
//     } else {
//       return method(req, res)
//     }
//   })
//     .once("error", (err) => {
//       console.error(err);
//       process.exit(1);
//     })
//     .listen(port, () => {
//       console.log(`http://${hostname}:${port}/resources?tab=Routes`);
//       // electronApp.whenReady().then(() => {
//       //   const win = new BrowserWindow({
//       //     useContentSize: true,
//       //     autoHideMenuBar: true,
//       //     webPreferences: {
//       //       nodeIntegration: true
//       //     },
//       //     title: 'DBview'
//       //   });

//       //   const view = new BrowserView();
//       //   win.setBrowserView(view);
//       //   view.setBounds({ x: 0, y: 0, width: 800, height: 600 });
//       //   view.setAutoResize({ width: true, height: true });
//       //   view.webContents.loadURL(`http://${hostname}:${port}/resources?tab=Routes`);

//       // });

//     });
// });

