<template>
    <div id="header"></div>
    <div id="main">
        <div id="left">
            left
        </div>
        <div id="middle">
            <interactiveScene />
        </div>
        <div id="right">
            right
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { slider, colorSwitch, rotation, snapshot, frontArrow, dashLine, interactiveScene } from '@/components'

let isReady = ref(false)
onMounted(() => {
    nextTick(() => {
        isReady.value = true
    })
})
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

}

#middle {
    background-color: transparent;
    flex: 1;
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
</style>