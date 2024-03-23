#!/usr/bin/env node

import { toRgb } from "colby";

var stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode(true);

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding("utf8");

const blueColor = toRgb(224, 255, 255)

const getConsoleMessage = (key: string = "") => {
  return `\x1B[2J\x1B[3J\x1B[H${blueColor(`
  ██████╗ ██████╗ ██╗   ██╗██╗███████╗██╗    ██╗
  ██╔══██╗██╔══██╗██║   ██║██║██╔════╝██║    ██║
  ██║  ██║██████╔╝██║   ██║██║█████╗  ██║ █╗ ██║
  ██║  ██║██╔══██╗╚██╗ ██╔╝██║██╔══╝  ██║███╗██║
  ██████╔╝██████╔╝ ╚████╔╝ ██║███████╗╚███╔███╔╝      
 `)} \n  b - Open In Browser.\n  e - Open In Electron.\n\n${key}`;
};
// on any data into stdin
process.stdout.write(getConsoleMessage());
stdin.on("data", function (key) {
  if (key.toString() === "\u0003") {
    process.exit();
  }
  console.log(key);
  process.stdout.write(getConsoleMessage(key.toString()));
});
// (async () => {
//   const response = await prompts({
//     // type: 'confirm',
//     // name: 'proceed',
//     // message: 'Do you want to display client info?',
//     // default: false
//     type: "text",
//     name: "value",
//     max: 1,
//     min: 1,
//     limit: 1,
//     onState: (v) => {
//     //   console.log("🚀 --> v:", v);
//       return v
//     },
//     // validate: (v) => {
//     //   console.log("🚀 --> v:", v);
//     //   return v[0];
//     // },

//     message: `\n     b - Open In Browser.\n     e - Open In Electron.\n`,
//   });
//   type PromptType =
//   | "text"asd
//   | "password"
//   | "invisible"
//   | "number"
//   | "confirm"
//   | "list"
//   | "toggle"
//   | "select"
//   | "multiselect"
//   | "autocomplete"
//   | "date"
//   | "autocompleteMultiselect";

//   r - reload the app
//   d - open developer menu
//   i - run on iOS
//   a - run on Android
//   console.log(response); // => { value: 24 }
// })();
// import next from "next";
// import path from "path";
// import { createServer } from "http";
// import { app as electronApp, BrowserView, BrowserWindow } from "electron";
// console.log("🚀 --> electronApp:", electronApp);

// const { creDteServer } = require('http')
// console.log("🚀 --> next:", next);
// next();
// const dirPath = path.resolve(path.join(__dirname, "../../"));

// console.log("🚀 --> dirPath:", dirPath);
// const app = next({
//   dev: true,
//   port: 3121,
//   dir: dirPath,
//   hostname: "localhost",
//   isNodeDebugging: false,
// });
// console.log("🚀 --> appr:", app);
// // app.start();
// // app.prepare()
// const dev = false;
// const hostname = "localhost";
// const port = 3000;
// // when using middleware `hostname` and `port` must be provided below
// const app = next({ dev, hostname, port, dir: dirPath });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   createServer(handle)
//     .once("error", (err) => {
//       console.error(err);
//       process.exit(1);
//     })
//     .listen(port, () => {
//       console.log(`> Ready on http://${hostname}:${port}`);
//     });
// });
// electronApp.whenReady().then(() => {
//   const win = new BrowserWindow({
//     useContentSize: true,
//     autoHideMenuBar: true,
//     title: 'DBview'
//   });

//   const view = new BrowserView();
//   win.setBrowserView(view);
//   view.setBounds({ x: 0, y: 0, width: 800, height: 600 });
//   view.setAutoResize({ width: true, height: true });
//   view.webContents.loadURL(`http://${hostname}:${port}/resources?tab=Routes`);
// });
