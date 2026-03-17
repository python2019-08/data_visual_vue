<template>
  <div class="main-middle-container">
    <div id="cesium-container-shared" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import * as Cesium from 'cesium'
import { sceneState, type SceneState } from '@/utils/sceneController'

function cameraLimit( viewer: Cesium.Viewer) 
{
  // 隐藏 Cesium 的版权信息
  viewer.cesiumWidget.creditContainer.style.display = 'none'


  const maxPitch = Cesium.Math.toRadians(-20.0) // 设置最大俯仰角，防止视角过平

  // 限制相机缩放范围
  viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1000 // 最近距离1000米
  viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40000000 // 最远距离4000万米

  // viewer.scene.preRender.addEventListener(() => {...}) 中限制相机俯仰角度范围的代码如果 也移到  
  // viewer.camera.changed.addEventListener(() => {...}) 中是不是更好​???
  // 答： 完全正确的。将限制俯仰角的逻辑从 `preRender` 移动到 `camera.changed` 事件中，在大多数情况下是**更好**的选择。
  // 
  // ### 为什么 `camera.changed` 更好？
  // 
  // 1.  **性能更高**：
  //     *   `preRender` 事件在**每一帧**都会触发，即使相机完全没有移动。这意味着您的代码会以每秒 30-60 次的频率不断
  //          地检查俯仰角，这会带来不必要的计算开销。
  //     *   `camera.changed` 事件只在**相机参数发生变化时**（例如用户平移、缩放、旋转之后）才会触发。这意味着您的检查逻辑只在需要时才运行，大大降低了 CPU 的负担。
  // 2.  **逻辑更清晰**：
  //     *   将所有与“相机变化后进行校正”相关的逻辑（如限制平移范围、限制俯仰角）都放在同一个 `camera.changed` 
  //         事件监听器中，会让代码的意图更清晰，也更便于维护。
    
  
  //---------- 限制地图可视范围 和 相机俯仰角范围 ---------- 
  // 成都市武侯区的经纬度范围： 东经：103.9458° ～ 104.0925° ，北纬：30.5753° ～ 30.6636° 
  const boundary = { // 地图可视范围 （经纬度范围）
    west: 103.9458,
    south: 30.5753,
    east: 104.0925,
    north: 30.6636
  }

  
    
  function on_cameraChanged()
  {
    const currentPosition = viewer.camera.positionCartographic
    const currentLon = Cesium.Math.toDegrees(currentPosition.longitude)
    const currentLat = Cesium.Math.toDegrees(currentPosition.latitude)
    const currentPitch = viewer.camera.pitch

    // 计算限制后的目标值
    const clampedLon = Cesium.Math.clamp(currentLon, boundary.west, boundary.east)
    const clampedLat = Cesium.Math.clamp(currentLat, boundary.south, boundary.north)
    const clampedPitch = Math.min(currentPitch, maxPitch)

    // 检查是否有任何值需要被修正
    if (
      clampedLon !== currentLon ||
      clampedLat !== currentLat ||
      clampedPitch !== currentPitch
    ) {
      // 原文链接：https://blog.csdn.net/no_money000/article/details/144405684     
      viewer.camera.changed.removeEventListener(on_cameraChanged) // 先取消监听
      // 先静止鼠标中键对相机倾斜角的移动
      viewer.scene.screenSpaceCameraController.enableTilt = false;  
 
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          clampedLon,
          clampedLat,
          currentPosition.height
        ),
        orientation: {
          heading: viewer.camera.heading,
          pitch: clampedPitch, // 使用修正后的俯仰角
          roll: viewer.camera.roll
        },
        duration: 0.0, // 立即移动
        // 当视角修正完成，再次开启监听
        complete: function () {
              viewer.scene.screenSpaceCameraController.enableTilt = true;
              viewer.camera.changed.addEventListener(on_cameraChanged); 
        }, 

      })
    }
  }// end-of  on_cameraChanged(...)

  viewer.camera.changed.addEventListener( on_cameraChanged)
}//end-of  cameraLimit()

function loadScene( viewer: Cesium.Viewer)
{
  // 1. 一次性加载所有模型资源, 并默认隐藏
  const buildingModel = viewer.entities.add({
    name: '整栋楼',
    position: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 0),
    model: {
      uri: '/models/building.glb', // 请替换为您的模型路径
      show: false,
      scale: 0.03
    }
  })
 
  const floor1Model = viewer.entities.add({
    name: '一楼',
    position: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 0),
    model: {
      uri: '/models/floor1.glb', // 请替换为您的模型路径
      show: false,
      scale: 0.03
    }
  })
 
  const floor2Model = viewer.entities.add({
    name: '二楼',
    position: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 0),
    model: {
      uri: '/models/floor2.glb', // 请替换为您的模型路径
      show: false,
      scale: 0.03
    }
  })
 
  // 2. 监听场景状态变化, 控制模型显隐
  watch(
    () => sceneState.activeView,

    (newView: SceneState) => {
      console.log('newView: SceneState。。。。。。。。。。。')
      // 首先, 隐藏所有内容
      viewer.scene.globe.show = false
      buildingModel.show = false
      floor1Model.show = false
      floor2Model.show = false
 
      // 然后, 根据新状态显示对应的内容
      switch (newView) {
        case 'HOME':
          console.log('.......camera--HOME')
          viewer.scene.globe.show = true
          buildingModel.show = true
          viewer.flyTo(buildingModel)
          break
        case 'FLOOR_1':
          console.log('.......camera--FLOOR_1')
          floor1Model.show = true
          viewer.flyTo(floor1Model)
          break
        case 'FLOOR_2':
          console.log('.......camera--FLOOR_2')
          floor2Model.show = true
          viewer.flyTo(floor2Model)
          break
      }
    },
    { immediate: true } // immediate: true 确保初始状态被正确设置
  )
}

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

  cameraLimit(viewer)
  // ----------------------------------------------------------------------

  // --- 场景管理核心 ---
  loadScene(viewer)  

})// end-of  onMounted(...)
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