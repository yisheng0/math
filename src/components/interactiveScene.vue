<script setup>
import { onMounted, onUnmounted, ref, provide ,inject } from 'vue'
import { ThreeApp } from '@/js/ThreeApp'
import { Interactive } from "@/js/geometry"
let webgl = ref(null)
let urlArr = ref([])
let imageSrc = ref('')
let threeApp,interactive

onMounted(() => {
    threeApp = new ThreeApp(webgl.value)
    interactive = new Interactive(threeApp)
    console.log(interactive.plane)
    threeApp.scene.add(interactive.gridHelper)
    threeApp.scene.add(interactive.rollOverMesh)
    threeApp.scene.add(interactive.plane)
    threeApp.render()
    window.threeApp = threeApp
    document.addEventListener('pointermove', (e)=>interactive.onPointerMove(e));
    document.addEventListener('pointerdown', (e)=>interactive.onPointerDown(e,false));
})
onUnmounted(() => {
    threeApp.clear()
})
let fn = ()=>{
    let objects = interactive.objects.splice(1, interactive.objects.length)
    urlArr.value = threeApp.renderThreeViewsForObjects(objects)
    imageSrc.value = urlArr.value[1]
    console.log(imageSrc)
}
</script>
<template>
     <button @click="fn" style="position: fixed; top: 10px; right: 10px;">11</button>
    <div class="container">
      <canvas ref="webgl" class="webgl"></canvas>
      <img :src="imageSrc" :class="{ 'show-img': imageSrc }" class="webgl-overlay">
    </div>
  </template>
  
  <style>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .webgl, .webgl-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .webgl-overlay {
    z-index: 2;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .webgl-overlay.show-img {
    opacity: 1;
  }
  </style>