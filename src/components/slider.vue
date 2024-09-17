<template>
    <el-card style="width: 15vw; background-color: #FBFBFB;" shadow="always">
        <div class="slider-demo-block">
            <span class="demonstration">Default value</span>
            <el-slider size="small" v-model="value" />
        </div>
    </el-card>
</template>
<script setup>
import { ref } from 'vue';
const value = ref(0);
</script>