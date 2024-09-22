<script setup>
import { ref } from 'vue';
import { injectObject3D } from '@/js/state';
const object3D = injectObject3D();
const selectedColor = ref('');
const colors = [
  '#A6ADB4',
  'aqua',
  '#BAE3A8',
  '#7D72EE',
  '#DC6374'
];

function handleColorClick(color) {
  selectedColor.value = color;
  // console.log(selectedColor.value);
  object3D.setColor(selectedColor.value);
}

</script>
<template>
    <el-card style="width: 15vw; background-color: #FBFBFB;" shadow="always">
        <div style="display: flex; justify-content: space-between; align-items: center; user-select: none;">
            <div
              v-for="(color, index) in colors"
              :key="index"
              :style="{ backgroundColor: color, width: '14px', height: '14px' }"
              @click="handleColorClick(color)"
            ></div>
        </div>
    </el-card>
</template>