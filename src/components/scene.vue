<script setup>
import { onMounted, onUnmounted, ref, provide ,inject } from 'vue'
import { ThreeApp } from '@/js/ThreeApp'
import { injectObject3D } from '@/js/state';
let webgl = ref(null)
let threeApp
const cubeObj = injectObject3D()
onMounted(() => {
    threeApp = new ThreeApp(webgl.value)
    threeApp.scene.add(cubeObj.getMesh())
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
<style>
.webgl {
    width: 100%;
    height: 100%;
}
</style>