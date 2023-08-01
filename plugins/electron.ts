declare global {
  interface Window {
    setTitle: (title: string) => void;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
})
