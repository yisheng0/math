<template>
    <div style="display: flex; flex-direction: column; align-items: center;">
        <el-card style="width: 10vw; height: 8vw; background-color: #FBFBFB; margin-bottom: 40px;" shadow="always">
            <img v-if="url" :src='url' class="canvasImg">
        </el-card>
        <div class="grid-container">
            <el-button class="grid-item" style="margin-left: 12px;" @click="takeSnapshot('top')">顶视图</el-button>
            <el-button class="grid-item" @click="takeSnapshot('bottom')">底视图</el-button>
            <el-button class="grid-item" @click="takeSnapshot('front')">前视图</el-button>
            <el-button class="grid-item" @click="takeSnapshot('back')">后视图</el-button>
            <el-button class="grid-item" @click="takeSnapshot('left')">左视图</el-button>
            <el-button class="grid-item" @click="takeSnapshot('right')">右视图</el-button>
        </div>
        <!-- <div class="grid-container" @click="takeSnapshot">
            <el-button class="grid-item" style="margin-left: 12px;" data-view="top">顶视图</el-button>
            <el-button class="grid-item" data-view="bottom">底视图</el-button>
            <el-button class="grid-item" data-view="front">前视图</el-button>
            <el-button class="grid-item" data-view="back">后视图</el-button>
            <el-button class="grid-item" data-view="left">左视图</el-button>
            <el-button class="grid-item" data-view="right">右视图</el-button>
        </div> -->
    </div>

</template>
<script setup>
import { ref, inject, onMounted } from 'vue'
const threeApp = window.threeApp
let url = ref('')

let takeSnapshot = (view) => {
    let position = {
        top: [0, 7, 0],
        bottom: [0, -7, 0],
        front: [0, 0, 7],
        back: [0, 0, -7],
        left: [-7, 0, 0],
        right: [7, 0, 0]
    }
    url.value = threeApp.takeSnapshot(position[view])
}


</script>
<style>
.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
}

.grid-item {
    padding: 20px;
    text-align: center;
}

.canvasImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* 保证图片铺满容器，同时保持宽高比 */
    object-position: center;
    /* 保证图片居中显示 */
}
</style>