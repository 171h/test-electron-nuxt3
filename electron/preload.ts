import { contextBridge, ipcRenderer } from 'electron'

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector)
    if (element)
      element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron'])
    replaceText(`${dependency}-version`, process.versions[dependency]!)
})

// contextBridge.exposeInMainWorld("electronAPI", {
//   setTitle: (title: string) => ipcRenderer.send("set-title", title),
// })

window.setTitle = (title: string) => ipcRenderer.send('set-title', title)
window.openFile = () => ipcRenderer.invoke('open-file')
window.readFile = (path: string) => ipcRenderer.invoke('read-file', path)
window.onUpdateCounter = (callback: (event: Electron.IpcRendererEvent, counter: number) => void) => ipcRenderer.on('update-counter', callback)
