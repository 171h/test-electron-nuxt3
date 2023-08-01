<script setup lang="ts">
import { ipcRenderer } from 'electron'
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

const title = ref('new title')
const setTitle = () => {
  window.setTitle(title.value)
}

const filePath = ref('')
const openFile = async () => {
  filePath.value = await window.openFile()
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
    
    <div>
      <h1>Renderer to main (one-way)</h1>
      Title: <input type="text" v-model="title">
      <button @click="setTitle">Set title</button>
    </div>

    <div>
      <h1>Renderer to main (two-way)</h1>
      <button @click="openFile">Open file</button>
      File Path:<strong>{{ filePath }}</strong>
    </div>
  </div>
</template>
