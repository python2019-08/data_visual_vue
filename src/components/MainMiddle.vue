<template>
  <div class="main-middle-container">
    <div id="cesium-container-shared" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium'

onMounted(() => {
  // 初始化 Cesium Viewer
  const viewer = new Cesium.Viewer('cesium-container-shared', {
    // baseLayer: new Cesium.ImageryLayer(
    //   new Cesium.UrlTemplateImageryProvider({
    //     url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //     subdomains: ['a', 'b', 'c']
    //   })
    // ),
    infoBox: false,
    selectionIndicator: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
  })

  // 设置相机初始视角
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(103.946, 30.66, 1000),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-90),
      roll: 0.0,
    },
  })

  // 隐藏 Cesium 的版权信息
  viewer.cesiumWidget.creditContainer.style.display = 'none'
})
</script>

<style scoped>
.main-middle-container {
  position: absolute;
  top: 80px; /* 假设 LayoutHeader 的高度是 80px */
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0; /* 确保在页面内容的下方 */
}
</style>