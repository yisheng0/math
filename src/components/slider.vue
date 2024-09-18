<template>
    <el-card style="width: 15vw; background-color: #FBFBFB;" shadow="always">
        <div>
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="margin: -5px;">{{stringValue}}</span>
                <el-tag type="info" style="width: 36px;">{{ value }}</el-tag>
            </div>
            <el-slider size="small" v-model="value" :min="2" :max="10" :step="1" />
        </div>
    </el-card>
</template>
<script setup>
import { ref, watch } from 'vue';
import { injectObject3D } from './js/state';
const props = defineProps({
  type: {
    type: String,
  }
});
const value = ref(4);
const object3D = injectObject3D();
let stringValue = ref('');
if (object3D && ['length', 'width', 'height'].includes(props.type)) {
  const map = {
    length: () => object3D.setDepth(value.value),
    width: () => object3D.setWidth(value.value),
    height: () => object3D.setHeight(value.value)
  };
  const stringMap = {
    length: '长',
    width: '宽',
    height: '高'
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