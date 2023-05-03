<script setup lang="ts">
import { Logger } from '@171h/log';
const logger = new Logger('Test.vue');

onMounted(() => {
  logger.info('window', window);
  logger.info('window.myAPI', window?.myAPI);
})

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
  </div>
</template>
