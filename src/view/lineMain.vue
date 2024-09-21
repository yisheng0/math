<template>
    <div id="header"></div>
    <div id="main">
        <div id="left">
            <slider type="width" style="margin-bottom: 40px;" />
            <slider type="length" style="margin-bottom: 40px;" />
            <slider type="height" style="margin-bottom: 40px;" />
            <colorSwitch style="margin-bottom: 40px;" />
            <rotation style="margin-bottom: 40px;" />
            <frontArrow style="margin-bottom: 40px" />
        </div>
        <div id="middle">
            <scene />
        </div>
        <div id="right">
            <dashLine />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import scene from '@/components/scene.vue';
import { slider, colorSwitch, rotation, snapshot, frontArrow, dashLine } from '@/components'
import { provideObject3D } from '../components/js/state';
provideObject3D()

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