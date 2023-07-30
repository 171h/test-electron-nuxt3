import { ipcMain, App, BrowserWindow } from "electron";

const logger = console;

export function registerIpcMainEvents(win: BrowserWindow, app: App) {
  ipcMain.on("message", (event, arg) => {
    logger.info("message", arg);
    event.reply("reply", "pong");
  });

  ipcMain.on("openNewWindow", (event, arg) => {
    let newWindow = new BrowserWindow({
      width: 600,
      height: 600,
      parent: win, // win is the parent window
      modal: true, // set modal to true to create a modal window
    });
    newWindow.loadURL("https://www.baidu.com");
  });
}