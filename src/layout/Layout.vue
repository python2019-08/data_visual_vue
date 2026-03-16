<template>
  <div class="layout">

    <LayoutHeader />

    <div class="app-menu-wrapper">
      <AppMenu />
    </div>

    <MainMiddle />

    <main class="layout-main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>

<!-- ------------------------------ -->
<script setup lang="ts">
import LayoutHeader from '@/layout/LayoutHeader.vue'
import MainMiddle from '@/components/MainMiddle.vue'
import AppMenu from '@/components/AppMenu.vue'
</script>

<!-- ------------------------------ -->
<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: SarasaMonoSC;
  background-color: #000;
  .app-menu-wrapper {
    position: absolute;
    top: 100px; /* Adjust based on LayoutHeader's height */
    left: 50%;
    z-index: 10; /* Highest z-index for menu */
    pointer-events: auto; /* Ensure menu is always interactive */
    transform: translateX(-50%);
  }
  .layout-main {
    position: absolute;
    top: 80px;      /* Match header height */
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;     /* Above map, below menu */
    overflow: hidden;
    pointer-events: none; /* Allow pointer events to pass through to the map */
  }
}
</style>