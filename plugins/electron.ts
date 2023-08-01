declare global {
  interface Window {
    setTitle: (title: string) => void;
    openFile: () => Promise<string>;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
})
