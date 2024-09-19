<script setup>
import { ref, watch } from 'vue';
import { injectObject3D } from './js/state';
let value = ref(false)

let object3D = injectObject3D()
watch(value, (newVal) => {
     if(value.value){
        object3D.addFrontArrow()
     } else {
         object3D.removeFrontArrow()
     }
})
</script>
<template>
    <el-card style="width: 15vw; background-color: #FBFBFB;" shadow="always">
        <div style="display: flex; justify-content: space-between; align-items: center; user-select: none;">
            <span>正视角箭头</span>
            <el-switch
            v-model="value"
            class="ml-2"
            style="--el-switch-on-color: #7D72EE; --el-switch-off-color: #DCDFE6"
          />
        </div>
    </el-card>
</template>