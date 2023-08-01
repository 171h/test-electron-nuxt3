import type { App, BrowserWindow, MenuItemConstructorOptions } from 'electron'
import { Logger } from '@171h/log'

const logger = new Logger('menu.ts')

const isMac = process.platform === 'darwin'

const firstMenu: MenuItemConstructorOptions[] = !isMac
  ? []
  : [{
      label: 'app.name',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    }]

export function appMenuTemplate(options: { app: App; win: BrowserWindow }) {
  return [
    ...firstMenu,
    {
      label: '文件',
      submenu: [
        {
          label: '打开文件',
          click(menuItem, browserWindow, event) {
            logger.info('open a file', { menuItem, browserWindow, event })
          },
        },
        {
          label: '新建文件',
          click(menuItem, browserWindow, event) {
            logger.info('create a file', { menuItem, browserWindow, event })
          },
        },
        {
          label: '退出',
          role: 'quit',
        },
      ],
    },
    {
      label: '编辑',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
      ],
    },
    {
      label: 'test',
      submenu: [
        {
          label: 'Increment',
          click: () => options.win.webContents.send('update-counter', 1),
        },
        {
          label: 'Decrement',
          click: () => options.win.webContents.send('update-counter', -1),
        },
      ],
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '关于',
          role: 'about',
        },
        {
          label: '帮助',
          role: 'help',
        },
      ],
    },
  ] as MenuItemConstructorOptions[]
}
