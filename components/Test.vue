<script setup lang="ts">
import { BrowserWindow, ipcRenderer } from 'electron'
import { Logger } from '@171h/log';
const logger = new Logger('Test.vue');

ipcRenderer.on('load', (event, arg) => {
  console.log('load', arg)
  logger.info('load', arg);
})

const send = () => {
  ipcRenderer.send('message', 'hello from renderer')
}

const openNewWindow = () => {
  ipcRenderer.send('openNewWindow', 'hello from renderer')

}

</script>

<template>
  <div>
    <div>
      <span>Node.js: </span>
      <span id="node-version"></span>
    </div>
    <div>
      <span>Chromium: </span>
      <span id="chrome-version"></span>
    </div>
    <div>
      <span>Electron:</span>
      <span id="electron-version"></span>
    </div>
    <button @click="send">send</button>
    <button @click="openNewWindow">点击打开新窗口</button>
    <input />
    <span>创建了新分支</span>
  </div>
</template>
