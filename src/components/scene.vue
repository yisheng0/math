<script setup>
import { onMounted, onUnmounted, ref, provide } from 'vue'
import { ThreeApp } from './js/ThreeApp'
import { injectObject3D } from './js/state';
let webgl = ref(null)
let threeApp
const cubeObj = injectObject3D()
provide('object3D', cubeObj)
onMounted(() => {
    threeApp = new ThreeApp(webgl.value)
    threeApp.scene.add(cubeObj.getMesh())
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