import { app, BrowserWindow, ipcMain, Menu, MenuItem, MenuItemConstructorOptions } from "electron";
import path from "path";
import { Logger } from "@171h/log";

const logger = new Logger("electron:main");
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
    show: false,
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

  const menuTemplate: MenuItemConstructorOptions[] = [
    {
      label: "文件",
      submenu: [
        {
          label: "打开文件",
          click(menuItem, browserWindow, event) {
            logger.info("open a file");
          },
        },
        {
          label: '关于',
          role: 'about'
        }
      ],
    },
    {
      label: "编辑",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "delete" },
      ],
    },
    {
      label: '角色',
      submenu: [
        {
          label: '复制',
          role: 'copy'
        },
        {
          label: '剪切',
          role: 'cut'
        },
        {
          label: '粘贴',
          role: 'paste'
        },
        {
          label: '最小化',
          role: 'minimize'
        },
        {
          label: '帮助',
          role: 'help'
        }
      ]
    },
    {
      label: '类型',
      submenu: [
        {
          label: '选项1',
          type: 'checkbox',
        },
        {
          label: '选项2',
          type: 'checkbox',
        },
        {
          label: '选项3',
          type: 'checkbox',
        },
        { type: 'separator' },
        {
          label: 'item1',
          type: 'radio',
        },
        {
          label: 'item2',
          type: 'radio',
        },
        {
          label: 'item3',
          type: 'radio',
        },
        { type: 'separator' },
        {
          label: 'windows',
          type: 'submenu',
          role: 'windowMenu'
        }
      ]
    },
    {
      label: '其他',
      submenu: [
        {
          label: '复制',
          role: 'copy'
        },
        {
          label: '剪切',
          role: 'cut'
        },
        {
          label: 'vite',
          icon: path.join(__dirname, '../public/vite.png'),
          accelerator: 'ctrl+o',
          click() {
            logger.info('vite')
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(process.env.VITE_PUBLIC!, "index.html"));
  }

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

app.whenReady().then(() => {
  bootstrap();
  logger.info("app", "current operation", process.platform);
});
