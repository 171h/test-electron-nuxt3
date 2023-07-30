import { MenuItemConstructorOptions } from "electron";
import path from "path";

const logger = console;
export const menuTemplate: MenuItemConstructorOptions[] = [
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
