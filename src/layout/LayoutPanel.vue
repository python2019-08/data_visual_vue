<template>
  <div class="layout-panel animate animate__bounceIn">
    <div class="panel-header">
      <div class="panel-header-title">{{ title }}</div>
    </div>
    <div class="panel-body">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
interface PropsType {
  title?: string | number
}
const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.layout-panel {
  position: relative;
  height: 100%;
  color: #fff;
  background-image: url('@/assets/images/panel_body_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    content: '';
    background-color: rgba(0, 0, 0, 50%); /* Adjust opacity as needed */
  }
  .panel-header,
  .panel-body {
    position: relative;
    z-index: 2; /* Ensure content is above the overlay */
  }
  .panel-header {
    display: flex;
    align-items: center;
    height: 65px;
    font-family: DouyuFont;
    background-image: url('@/assets/images/panel_title_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .panel-header-title {
      position: relative;
      top: -12px;
      left: 70px;
      font-size: 15px;
    }
  }
  .panel-body {
    box-sizing: border-box;

    // height: 220px;
    height: calc(100% - 65px);
    padding: 0 10px 10px;
    overflow: hidden;
    background-image: url('@/assets/images/panel_body_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;    
  }
}
</style>