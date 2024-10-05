<template>
    <div id="header"></div>
    <div id="main">
        <div id="left">
            <slider :type="sliderTypes[0]" style="margin-bottom: 40px;" />
            <slider :type="sliderTypes[1]" style="margin-bottom: 40px;" />
            <slider :type="sliderTypes[2]" style="margin-bottom: 40px;" />
            <colorSwitch style="margin-bottom: 40px;" />
            <rotation style="margin-bottom: 40px;" />
        </div>
        <div id="middle">
            <scene />
        </div>
        <div id="right">
            <snapshot v-if="isReady" />
            <frontArrow style="margin-top: 5vh;"/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { useRoute } from 'vue-router';
import scene from '@/components/scene.vue';
import { slider, colorSwitch, rotation, snapshot, frontArrow } from '@/components'
import { provideObject3D } from '@/js/state';

let isReady = ref(false)
const route = useRoute();
const sliderTypes = computed(() => {
    if (route.query.shape === 'cylinder') {
        return ['radiusTop', 'radiusBottom', 'height'];
    }
    if(route.query.shape === 'rectangle') {
        return ['width', 'depth', 'height'];
    }
});


provideObject3D(route.query.shape)
onMounted(() => {
    // console.log(route.query.shape)
    nextTick(() => {
        isReady.value = true
        // console.log(window.threeApp)
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