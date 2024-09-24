<template>
    <div id="header"></div>
    <div id="main">
        <div id="left">
            <el-card style="width: 15vw; background-color: #FBFBFB;" shadow="always">
                <div style="display: flex; justify-content: space-between; align-items: center; user-select: none;">
                    <span>重置视角</span>
                    <!-- <el-button type="primary" @click="()=>scene?.interactive?.clearObjects()">清空场景</el-button> -->
                    <el-icon>
                        <Refresh
                            @click="scene?.interactive?.threeApp?.resetPerspective.call(scene.interactive.threeApp)" />
                    </el-icon>
                </div>
            </el-card>
            <el-card style="width: 15vw; background-color: #FBFBFB;" shadow="always">
                <div style="display: flex; justify-content: space-between; align-items: center; user-select: none;">
                    <span>清空广场</span>
                    <!-- <el-button type="primary" @click="()=>scene?.interactive?.clearObjects()">清空场景</el-button> -->
                    <el-icon>
                        <DeleteFilled @click="scene?.interactive?.clearObjects.call(scene.interactive)" />
                    </el-icon>
                </div>
            </el-card>
            <el-card style="width: 15vw; background-color: #FBFBFB;" shadow="always">
                <div style="display: flex; justify-content: space-between; align-items: center; user-select: none;">
                    <span>交互模式</span>
                    <el-switch v-model="isAdd" class="ml-2"
                        style="--el-switch-on-color: #7D72EE; --el-switch-off-color: #DCDFE6" />
                </div>
            </el-card>
            <el-card style="width: 15vw; background-color: #FBFBFB;" shadow="always">
                <div style="display: flex; justify-content: space-between; align-items: center; user-select: none;">
                    <span>删除模式</span>
                    <el-switch v-model="isRemove" class="ml-2"
                        style="--el-switch-on-color: #7D72EE; --el-switch-off-color: #DCDFE6" />
                </div>
            </el-card>
            <el-card style="width: 15vw; background-color: #FBFBFB;" shadow="always">
                <div class="english" style="margin-bottom: 4px;">Tips</div>
                <div
                    style="display: flex; flex-direction: column; justify-content: space-between;  user-select: none; font-size: 15px; color: #868688;">
                    <div>按<span class="english">Ctrl</span>添加物体</div>
                    <div>按<span class="english">Shift</span>删除物体</div>
                </div>
            </el-card>
        </div>
        <div id="middle">
            <interactiveScene :scene="scene" />
            <img :src="imageSrc" :class="{ 'show-img': imageSrc }" class="webgl-overlay">
        </div>
        <div id="right">
            <el-button  @click="snapshot">俯视图</el-button>
            <el-icon @click="imageSrc = ''" v-show="imageSrc" style="background-color: #DC6374; border-radius: 50%; padding: 5px; margin-top:20px">
                <Close />
            </el-icon>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, onUnmounted } from 'vue';
import { interactiveScene } from '@/components'
import { DeleteFilled, Refresh, Close } from '@element-plus/icons-vue'

let isAdd = ref(false)
let isRemove = ref(false)
let scene = reactive({})
let isSpacePressed = false;
let imageSrc = ref('')
let snapshot = () => {
    let objects = scene.interactive.objects.splice(1, scene.interactive.objects.length)
    // three响应式与vue响应式冲突，导致three无法响应vue的修改
    //   let urlArr = scene.interactive.threeApp.renderThreeViewsForObjects(objects)
    let urlArr = window.threeApp.renderThreeViewsForObjects(objects)
    imageSrc.value = urlArr[1]
}
const handleKeyDown = (event) => {
    if (event.code === 'Space') {
        isSpacePressed = true;
    } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        isRemove.value = true;
    } else if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
        isAdd.value = true;
    }
};

const handleKeyUp = (event) => {
    if (event.code === 'Space') {
        isSpacePressed = false;
    } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        isRemove.value = false;
    } else if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
        isAdd.value = false;
    }
};
const handlePointerMove = (e) => {
    if (isSpacePressed) { } else {
        scene?.interactive.onPointerMove(e, isAdd.value)
    }
}
const handlePointerDown = (e) => {
    if (isSpacePressed) { } else {
        scene?.interactive.onPointerDown(e, isAdd.value, isRemove.value)
    }
}
onMounted(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('pointermove', (e) => handlePointerMove(e));
    document.addEventListener('pointerdown', (e) => handlePointerDown(e));
})
onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerdown', handlePointerDown);
});
</script>

<style scoped>
#header {
    height: 6vh;
}

#main {
    display: flex;
    width: 99vw;
    height: 93vh;
}

#left {
    background-color: #FEFEFE;
    flex: 0 0 20%;
    display: flex;
    align-items: center;
    flex-direction: column;
    user-select: none;

    >div {
        margin-bottom: 20px;
    }
}

#middle {
    background-color: transparent;
    flex: 1;
    position: relative;
    width: 100%;
    height: 100%;

    .webgl,
    .webgl-overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .webgl {
        pointer-events: all;
    }

    .webgl-overlay {
        z-index: 2;
        opacity: 0;
        pointer-events: none
    }

    .webgl-overlay.show-img {
        opacity: 1;
    }
}

#right {
    background-color: #FEFEFE;
    flex: 0 0 20%;
    user-select: none;
    display: flex;
    align-items: center;
    flex-direction: column;
}

:deep(.el-slider__bar) {
    background-color: #7D72EE;
}

:deep(.el-slider__button) {
    border: 2px solid #7D72EE;
}

.english {
    color: #808085;
    /* 深色字体，例如深灰色 */
    font-weight: bold;
    /* 加粗 */
}
</style>