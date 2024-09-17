<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import {ThreeApp} from './js/ThreeApp'
var webgl = ref(null)
var threeApp
onMounted(() => {
    console.log("hello threejs")
    threeApp = new ThreeApp(webgl.value)
    threeApp.render()
})
onUnmounted(() => {
    threeApp.clear()
})
</script>
<template>
    <canvas ref="webgl" class="webgl"></canvas>
</template>
<style>
.webgl {
   width: 100%;
   height: 100%;
}
</style>