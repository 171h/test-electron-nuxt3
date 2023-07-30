import { BrowserWindow } from "electron";
const logger = console;

export function registerWinEvents(win:BrowserWindow) {
  setTimeout(() => {
    win.webContents.send("load", "hello from electron");
  }, 3000);

  win.webContents.on("did-finish-load", () => {
    logger.info("win.webContents", "did-finish-load");
  });
  win.webContents.on("did-fail-load", () => {
    logger.info("win.webContents", "did-fail-load");
  });
  win.webContents.on("did-frame-finish-load", () => {
    logger.info("win.webContents", "did-frame-finish-load");
  });
  win.webContents.on("did-start-loading", () => {
    logger.info("win.webContents", "did-start-loading");
  });
  win.webContents.on("did-stop-loading", () => {
    logger.info("win.webContents", "did-stop-loading");
  });
  win.webContents.on("dom-ready", () => {
    logger.info("win.webContents", "dom-ready");
  });
  win.webContents.on("console-message", () => {
    logger.info("win.webContents", "console-message");
  });
  win.webContents.on("crashed", () => {
    logger.info("win.webContents", "crashed");
  });
  win.webContents.on("did-fail-load", () => {
    logger.info("win.webContents", "did-fail-load");
  });
  win.webContents.on("ipc-message", () => {
    logger.info("win.webContents", "ipc-message");
  });
  win.on("ready-to-show", () => {
    logger.info("win", "ready-to-show");
    win.show();
  });
  win.on("move", () => {
    // logger.info('win', 'move')
  });
  win.on("moved", () => {
    logger.info("win", "moved");
  });
  win.on("resize", () => {
    // logger.info('win', 'resize')
  });
  win.on("resized", () => {
    logger.info("win", "resized");
  });
  win.on("new-window-for-tab", () => {
    logger.info("win", "new-window-for-tab");
  });
  win.on("page-title-updated", () => {
    logger.info("win", "page-title-updated");
  });
  win.on("will-move", () => {
    // logger.info('win', 'will-move')
  });
  win.on("close", () => {
    logger.info("win", "close");
    win = null!;
  });
  win.on("closed", () => {
    logger.info("win", "closed");
    win = null!;
  });
}
