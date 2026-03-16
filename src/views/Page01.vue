<template>
  <div class="page-01">
    <div class="main-left">
      <!-- 这里可以替换为 Page01 特有的图表 -->
      <WidgetPanel04 title="弯沉病害统计汇总" />
      <WidgetPanel02 title="人行道平整度情况汇总" />
      <WidgetPanel03 title="路面平整度情况汇总 " />
    </div>

    <div class="main-right">
      <!-- 这里可以替换为 Page01 特有的图表 -->
      <WidgetPanel06 title="路面损坏情况汇总" />
      <WidgetPanel01 title="路面损坏情况汇总" />
      <WidgetPanel05 title="路面损坏情况汇总" />
    </div>


  </div>
</template>

<script setup lang="ts">
import {
  WidgetPanel01,
  WidgetPanel02,
  WidgetPanel03,
  WidgetPanel04,
  WidgetPanel05,
  WidgetPanel06,
} from '@/components'
import { onMounted, ref, reactive } from 'vue'
import { LayoutLoading } from '@/layout'

const loading = reactive({
  total: 0,
  loaded: 0,
  isLoading: false,
})
const current = ref('')

onMounted(() => {

})
</script>

<style lang="scss" scoped>
// 样式与 HomePage.vue 类似，但使用了新的根类名
.page-01 {
  position: relative;
  width: 100%;
  height: 100%;

  /* Background properties removed to make it transparent */
  .main-left {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 999;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: repeat(3, calc((100% - 40px) / 3));
    grid-gap: 20px;
    width: 420px;
    height: calc(100% - 20px); /* Enable interaction for this panel */
    pointer-events: auto; /* Enable interaction for this panel */
  }
  .main-right {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 999;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: repeat(3, calc((100% - 40px) / 3));
    grid-gap: 20px;
    width: 420px;
    height: calc(100% - 20px);
  }
  .main-middle {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
      width: 100%;
      height: 100%;
      pointer-events: none;
      content: '';
      background-image: radial-gradient(circle, transparent 30%, #000 70%);
    }
  }
}
</style>