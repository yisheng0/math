<script setup>
import { ref } from 'vue';
const selectedColor = ref('');

const colors = [
  'aqua',
  '#BAE3A8',
  '#7D72EE',
  '#4175E4',
  '#A6ADB4'
];

function handleColorClick(color) {
  selectedColor.value = color;
  console.log(selectedColor.value);
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