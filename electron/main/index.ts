import path from 'node:path'
import { BrowserWindow, Menu, app } from 'electron'
import { Logger } from '@171h/log'
import { registerWinEvents } from './register-win-events'
import { registerAppEvents } from './register-app-events'
import { registerIpcMainEvents } from './register-ipcMain-events'
import { appMenuTemplate } from './menu'

const logger = new Logger('electron:main:index.ts')

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js
// │ ├─┬ preload
// │ │ └── index.js
// │ ├─┬ renderer
// │ │ └── index.html

process.env.ROOT = path.join(__dirname, '..')
process.env.DIST = path.join(process.env.ROOT, 'dist-electron')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.ROOT, 'public')
  : path.join(process.env.ROOT, '.output/public')
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

let win: BrowserWindow
const preload = path.join(process.env.DIST, 'preload.js')

function bootstrap() {
  win = new BrowserWindow({
    title: 'Test Nuxt3 with Electron',
    webPreferences: {
      preload,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    },
  })

  const menu = Menu.buildFromTemplate(appMenuTemplate({ app, win }))
  Menu.setApplicationMenu(menu)

  registerWinEvents(win)
  registerAppEvents(app, bootstrap)
  registerIpcMainEvents(win, app)

  logger.info('temp dir', app.getPath('temp'))

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  }
  else {
    win.loadFile(path.join(process.env.VITE_PUBLIC!, 'index.html'))
  }
}

app.whenReady().then(bootstrap)
