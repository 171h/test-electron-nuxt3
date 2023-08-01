declare global {
  interface Window {
    setTitle: (title: string) => void
    openFile: () => Promise<string>
    onUpdateCounter: (callback: (event: Electron.IpcRendererEvent, counter: number) => void) => void
  }
}

export default defineNuxtPlugin((nuxtApp) => {
})
