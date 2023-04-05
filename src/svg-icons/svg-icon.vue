<!--
 * @Author: aardpro
 * @Date: 2022-06-25 13:37:40
 * @LastEditors: aardpro
 * @LastEditTime: 2022-06-30 22:43:54
 * @Description: 读取Svg Icon, 使用方法
 <svg-icon :name="iconName" :styleObj="{}" classList="w-[1rem] h-[1rem]" @click="onClick" />
-->
<template>
  <svg :class="svgClass" v-bind="$attrs" :style="styleObj">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup name="SvgIcon">
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  styleObj: {
    type: Object,
    default: () => ({}),
  },
  classList: {
    type: String,
    default: 'w-4 h-4',
  },
  baseClassList: {
    type: String,
    default: 'fill-current align-middle',
  },
});

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => `${props.baseClassList} ${props.classList} icon-${props.name}`);
</script>
