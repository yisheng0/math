<template>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <el-card style="width: 15vw; background-color: #FBFBFB; margin-bottom: 20px;" shadow="always">
            <div style="display: flex; align-items: center; justify-content: space-between; ">
                <span>添加辅助线</span>
                <el-tag type="info" @click="addLine">+</el-tag>
            </div>
        </el-card>
        <div v-for="(item, index) in pObject" :key="index" style="margin-bottom: 20px;">
            <el-card style="width: 15vw; height: 18vh; background-color: #FBFBFB;display:relative" shadow="always">
                <div style="display: flex; align-items: center; flex-direction: column;">
                    <div style="width: 12vw;display: flex; align-items: center; justify-content: space-between;">
                        <input type="text" style="width: auto; outline: none; border: none; width:4vw; font-size: 1.2em;"
                            :disabled="isEditor" v-model="item.id">
                        <div style="display: flex; justify-content: center; align-items: baseline;">
                            <div style="margin-right: 8px;">
                                <el-icon @click="changeEditor(item)" v-if="isEditor">
                                    <Lock />
                                </el-icon>
                                <el-icon @click="changeEditor(item)" v-else>
                                    <Check />
                                </el-icon>
                            </div>
                            <el-icon style="margin-right: 8px;">
                                <CircleClose @click="cancel(item)" />
                            </el-icon>
                            <el-icon @click="lock(item)" :class="{ 'is-locked': isLock }">
                                <IceCreamRound />
                            </el-icon>
                        </div>
                    </div>

                    <el-divider border-style="double" style="margin: 10px;" />
                    <div>
                        <span style="font-size: 1.2em; display:inline-block;">p1</span> 
                        &nbsp &nbsp
                        (<input type="text" style="width: auto; outline: none; border: none; width:7vw; font-size: 1.2em;"
                            :disabled="isEditor" v-model="item.P1">)
                    </div>
                    <div>
                        <span style="font-size: 1.2em; display:inline-block;">p2</span> 
                        &nbsp &nbsp
                        (<input type="text" style="width: auto; outline: none; border: none; width:7vw;font-size: 1.2em;"
                            :disabled="isEditor" v-model="item.P2">)
                    </div>
                </div>
            </el-card>
        </div>
    </div>

</template>
<script setup>
import { reactive, watch, ref } from 'vue'
import { injectObject3D } from './js/state';
import { Lock, CircleClose, Check, IceCreamRound } from '@element-plus/icons-vue'
const object3D = injectObject3D()
let isEditor = ref(true)
let isLock = ref(false)
let { pObject } = object3D.line

watch(() => object3D.stateContext.isRender, (newValue) => {
    console.log("改变了")
    object3D.stateContext.isRender = false
})


let addLine = () => {
    let last = pObject[pObject.length - 1]
    let { id, P1, P2 } = last
    if (id === "" && P1 === "" && P2 === "") {
        ElNotification({
            title: 'Warning',
            message: "请依次填写",
            type: 'warning',
        })
    } else {
        pObject.push({
            id: "",
            P1: "",
            P2: "",
            isLock: false
        })
    }

}
let changeEditor = (item) => {
    isEditor.value = !isEditor.value
    if (isEditor.value) {
        let { id, P1, P2 } = item
        if (id === "" || P1 === "" || P2 === "") {
            ElNotification({
                title: 'Error',
                message: '信息不完整',
                type: 'error',
            })
            return;
        }
        let nu = 0
        for (let i = 0; i < pObject.length; i++) {
            if (pObject[i].id === id) {
                nu++
                if (nu > 1) {
                    ElNotification({
                        title: 'Error',
                        message: '该线段已存在',
                        type: 'error',
                    })
                    return;
                }
            }
        }
        let P1n = item.P1.split(',').map(item => Number(item))
        let P2n = item.P2.split(',').map(item => Number(item))
        // console.log(P1, P2)
        object3D.drawDashedLine(P1n, P2n, item.id)

    }
}
let cancel = (item) => {
    let { id } = item
    if (id === "") {
        pObject.pop();
        return;
    }
    pObject.splice(pObject.indexOf(item), 1)
    object3D.line.cancelDashedLine(item.id)
}
let lock = (item) => {
    isLock.value = !isLock.value
    if (item.isLock) {
        item.isLock = false
    } else {
        item.isLock = [[], []]
        let indexMap = {
            0: object3D.geometry.parameters.width,
            1: object3D.geometry.parameters.height,
            2: object3D.geometry.parameters.depth,
        };
        let p1 = item.P1.split(',').map(item => Number(item))
        let p2 = item.P2.split(',').map(item => Number(item))
        for(let i = 0; i < 3; i++){
            if(p1[i]==indexMap[i]){
                item.isLock[0].push(i)
            }
        }
        for(let i = 0; i < 3; i++){
            if(p2[i]==indexMap[i]){
                item.isLock[1].push(i)
            }
        }
        console.log(item.isLock)
    }
}
</script>

<style scoped>
.is-locked {
    color: blue;
}
</style>