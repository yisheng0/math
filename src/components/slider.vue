<template>
    <el-card style="width: 15vw; background-color: #FBFBFB;" shadow="always">
        <div>
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="margin: -5px;">{{stringValue}}</span>
                <el-tag type="info" style="width: 36px;">{{ value }}</el-tag>
            </div>
            <el-slider size="small" v-model="value" :min="0" :max="6" :step="1" />
        </div>
    </el-card>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { injectObject3D } from '@/js/state';
const props = defineProps({
  type: {
    type: String,
    validator: (value) => ['width', 'depth', 'height', 'radiusTop', 'radiusBottom'].includes(value)
  }
});
const object3D = injectObject3D();
let nu = object3D.geometry.parameters[props.type]
const value = ref(nu);
let stringValue = ref('');


if (object3D) {
  const map = {
    depth: () => object3D.setDepth(value.value),
    width: () => object3D.setWidth(value.value),
    height: () => object3D.setHeight(value.value),
    radiusTop: () => object3D.setTopRadius(value.value),
    radiusBottom: () => object3D.setBottomRadius(value.value)
  };

  const stringMap = {
    depth: '长',
    width: '宽',
    height: '高',
    radiusTop: '顶部r',
    radiusBottom: '底部r'
  }
  stringValue = stringMap[props.type];
  const fn = map[props.type];
  watch(value, (newValue) => {
    fn(); 
  });
} else {
  console.error('props.type不存在');
}
</script>