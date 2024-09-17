<template>
    <div id="header" />
    <div id="main">
        <div id="left">
            <slider/>
            <slider/>
            <slider/>
            <colorSwitch/>
        </div>
        <div id="middle">
            <scene/>
        </div>
        <div id="right"></div>
    </div>
</template>

<script setup>
// import {ElCard, ElButton} from 'element-plus'
import { ref } from 'vue';
import scene from '@/components/scene.vue';
import { slider, colorSwitch } from '@/components'

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
    justify-content: space-around;
}

#middle {
    background-color: transparent;
    flex: 1;
}

#right {
    background-color: #FEFEFE;
    flex: 0 0 20%;
    user-select: none;
}

:deep(.el-slider__bar ){
    background-color: #7D72EE;
}

:deep(.el-slider__button)  {
    border: 2px solid #7D72EE;
}
</style>