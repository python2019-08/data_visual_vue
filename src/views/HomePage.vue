<template>
  <div class="home-page">
    <div class="main-left">
      <WidgetPanel04 title="弯沉病害统计汇总" />
      <WidgetPanel02 title="人行道平整度情况汇总" />
      <WidgetPanel03 title="路面平整度情况汇总 " />
    </div>

    <div class="main-right">
      <WidgetPanel07
        v-show="current"
        :title="current + '详情'"
        :name="current"
      />
      <WidgetPanel06 v-show="!current" title="路面损坏情况汇总" />
      <WidgetPanel01 title="路面损坏情况汇总" />
      <WidgetPanel05 title="路面损坏情况汇总" />
    </div>


  </div>
</template>

<!--   引入布局组件   -->
<script setup lang="ts">
import {
  WidgetPanel01,
  WidgetPanel02,
  WidgetPanel03,
  WidgetPanel04,
  WidgetPanel05,
  WidgetPanel06,
  WidgetPanel07,
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
.home-page {
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
}
</style>