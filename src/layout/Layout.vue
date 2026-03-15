<template>
  <div class="layout">

    <LayoutHeader />

    <AppMenu />

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
  .layout-main {
    position: relative;
    flex: 1;
    overflow: hidden;
  }
}
</style>