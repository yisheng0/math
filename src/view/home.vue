<template>
    <div class="home">
        <el-card
            v-for="item in items"
            :key="item.path"
            style="width: 480px"
            @click="navigate(item)"
        >
            {{ item.label }}
        </el-card>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const items = [
    { label: '矩形展示', path: '/base', params: { shape: 'rectangle' } },
    { label: '圆柱展示', path: '/base', params: { shape: 'cylinder' } },
    { label: '矩阵变换', path: '/math' },
    { label: '模型工厂', path: '/line' },
    { label: '交互三视图', path: '/interactive' }
];
const navigate = (item) => {
    if (item.params) {
        router.push({ path: item.path, query: item.params });
    } else {
        router.push(item.path);
    }
};
</script>

<style scoped>
.home {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.el-card {
    margin-bottom: 20px;
    user-select: none;
    cursor: pointer; /* 增加手型光标，提示用户可以点击 */
}
</style>