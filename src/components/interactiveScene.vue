<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { ThreeApp } from '@/js/ThreeApp'
import { Interactive } from "@/js/geometry"

let { scene } = defineProps(['scene'])
let webgl = ref(null)
let threeApp, interactive

onMounted(() => {

  threeApp = new ThreeApp(webgl.value)
  interactive = new Interactive(threeApp)
  scene.interactive = interactive
  threeApp.scene.add(interactive.gridHelper)
  threeApp.scene.add(interactive.plane)
  threeApp.render()
  window.threeApp = threeApp

})
onUnmounted(() => {
  threeApp.clear()
})
</script>
<template>
    <canvas ref="webgl" class="webgl"></canvas>
</template>