<script setup lang="ts">
import { ipcRenderer } from 'electron'
import { Logger } from '@171h/log'

const logger = new Logger('Test.vue')

ipcRenderer.on('load', (event, arg) => {
  logger.info('load', arg)
  logger.info('load', arg)
})

function send() {
  ipcRenderer.send('message', 'hello from renderer')
}

function openNewWindow() {
  ipcRenderer.send('openNewWindow', 'hello from renderer')
}

const title = ref('new title')
function setTitle() {
  window.setTitle(title.value)
}

const filePath = ref('')
async function openFile() {
  filePath.value = await window.openFile()
  const data = await window.readFile(filePath.value)
  logger.info('data', data)
}

const counter = ref(0)
window.onUpdateCounter((event, value) => {
  logger.info('value', value)
  counter.value += value
})
</script>

<template>
  <div>
    <div>
      <span>Node.js: </span>
      <span id="node-version" />
    </div>
    <div>
      <span>Chromium: </span>
      <span id="chrome-version" />
    </div>
    <div>
      <span>Electron:</span>
      <span id="electron-version" />
    </div>
    <button @click="send">
      send
    </button>
    <button @click="openNewWindow">
      点击打开新窗口
    </button>
    <input>

    <div>
      <h1>Renderer to main (one-way)</h1>
      Title: <input v-model="title" type="text">
      <button @click="setTitle">
        Set title
      </button>
    </div>

    <div>
      <h1>Renderer to main (two-way)</h1>
      <button @click="openFile">
        Open file
      </button>
      File Path:<strong>{{ filePath }}</strong>
    </div>

    <div>
      <h1>Main to renderer</h1>
      Counter: <strong>{{ counter }}</strong>
    </div>
  </div>
</template>
