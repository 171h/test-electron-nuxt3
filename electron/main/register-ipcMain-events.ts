import type { App } from 'electron'
import { BrowserWindow, dialog, ipcMain } from 'electron'
import { Logger } from '@171h/log'

const logger = new Logger('register-ipcMain-events.ts')

export function registerIpcMainEvents(win: BrowserWindow, app: App) {
  ipcMain.on('message', (event, arg) => {
    logger.info('message', arg)
    event.reply('reply', 'pong')
  })

  ipcMain.on('openNewWindow', (event, arg) => {
    const newWindow = new BrowserWindow({
      width: 600,
      height: 600,
      parent: win, // win is the parent window
      modal: true, // set modal to true to create a modal window
    })
    newWindow.loadURL('https://www.baidu.com')
  })
  ipcMain.on('set-title', handleSetTitle)
  ipcMain.handle('open-file', openFile)
}

function handleSetTitle(event: Electron.IpcMainEvent, title: string) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win?.setTitle(title)
}

async function openFile() {
  const { canceled, filePaths, bookmarks } = await dialog.showOpenDialog({})
  if (!canceled)
    return filePaths[0]
}
