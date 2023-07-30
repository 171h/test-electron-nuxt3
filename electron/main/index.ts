import { app, BrowserWindow, ipcMain, Menu, MenuItem, MenuItemConstructorOptions } from "electron";
import path from "path";
import { menuTemplate } from './menu'
import { registerIpcMainEvents } from './register-ipcMain-events'
import { registerWinEvents } from './register-win-events'
import { registerAppEvents } from './register-app-events'
// import { Logger } from "@171h/log";

// const logger = new Logger("electron:main");
const logger = console;
// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js
// │ ├─┬ preload
// │ │ └── index.js
// │ ├─┬ renderer
// │ │ └── index.html

process.env.ROOT = path.join(__dirname, "..");
process.env.DIST = path.join(process.env.ROOT, "dist-electron");
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.ROOT, "public")
  : path.join(process.env.ROOT, ".output/public");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let win: BrowserWindow;
const preload = path.join(process.env.DIST, "preload.js");

function bootstrap() {
  win = new BrowserWindow({
    // x: 4000,
    // y: 1200,
    width: 1000,
    height: 1000,
    show: true,
    // alwaysOnTop: true,
    resizable: false, // set to false to disable resize
    frame: true, // set to false to hide title bar
    icon: path.join(process.env.VITE_PUBLIC!, "favicon.ico"), // set icon
    title: "171h electron",
    transparent: false, // set to true to disable transparent
    autoHideMenuBar: false, // set to true to hide menu bar
    webPreferences: {
      preload,
      nodeIntegrationInWorker: true, // set to true to enable node integration in worker
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  registerIpcMainEvents(win, app)
  registerWinEvents(win)
  registerAppEvents(app, bootstrap)

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(process.env.VITE_PUBLIC!, "index.html"));
  }
}

app.whenReady().then(() => {
  bootstrap();
  logger.info("app", "current operation", process.platform);
});
