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

    <div class="main-middle">
      <LayoutLoading :loading="loading" />
      <div id="cesium-container" style="width: 100%; height: 100%"></div>
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
import * as Cesium from 'cesium'

const loading = reactive({
  total: 0,
  loaded: 0,
  isLoading: false,
})
const current = ref('')

onMounted(() => {
  const viewer = new Cesium.Viewer('cesium-container', {
    // baseLayer: new Cesium.ImageryLayer(new Cesium.UrlTemplateImageryProvider({
    //   url: '/osm/{z}/{x}/{y}.png'
    // })),
    infoBox: false,
    selectionIndicator: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    // 是否显示图层选择
    baseLayerPicker: false,
  })

  viewer.camera.setView({
    // 武侯区的经纬度范围如下： 
    // 北纬范围​	== 30°34′31″N ~ 30°39′49″N  ==  30.5753°N ~ 30.6636°N
    // 东经范围​	== 103°56′45″E ~ 104°05′33″E  ==  103.9458°E ~ 104.0925°E
    destination: Cesium.Cartesian3.fromDegrees(103.946, 30.66, 1000),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-90),
      roll: 0.0,
    },
  })
  // hide logo
  viewer.cesiumWidget.creditContainer.style.display = 'none'
  
})
</script>

<style lang="scss" scoped>
.home-page {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #05326a;
  background-image: url(@/assets/images/grid_bg_01.png);
  background-repeat: repeat;
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
    height: calc(100% - 20px);
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