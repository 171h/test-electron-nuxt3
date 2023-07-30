import { App, BrowserWindow } from 'electron'

const logger = console

export function registerAppEvents(app: App, bootstrap: () => void) {
  app.on("window-all-closed", () => {
    logger.info("app", "window-all-closed");
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    logger.info("app", "activate");
    if (BrowserWindow.getAllWindows().length === 0) bootstrap();
  });
  app.on("will-quit", () => {
    logger.info("app", "will-quit");
  });
  app.on("before-quit", () => {
    logger.info("app", "before-quit");
  });
  app.on("quit", () => {
    logger.info("app", "quit");
  });
}
