<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <Test />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ipcRenderer } from 'electron'
import fs from 'node:fs'

onMounted(() => {
  console.log('ipcRenderer:',ipcRenderer)
  console.log('fs:', fs)
})
</script>
