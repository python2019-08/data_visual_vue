<!-- 
代码说明:

我们使用 useRouter 来获取路由实例。
通过 router.options.routes，我们可以访问到在 src/router/index.ts 中定义的所有路由配置。
我们使用 <router-link> 组件来创建导航链接。这是 vue-router 提供的标准组件，它能正确处理路由跳转。
active-class="is-active" 会在当前路由匹配该链接时，自动为 <router-link> 添加一个 is-active 的 CSS 类，方便我们设置选中状态的样式。 
-->
<template>
  <div class="app-menu">
    <router-link
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path"
      class="menu-item"
      active-class="is-active"
    >
      {{ item.title }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 获取所有顶层路由，并过滤掉没有标题的
const menuItems = computed(() =>
  router.options.routes
    .filter(route => route.meta?.title)
    .map(route => ({
      path: route.path,
      title: route.meta!.title as string,
    }))
)
</script>

<style lang="scss" scoped>
.app-menu {
  display: flex;
  gap: 20px; // 菜单项之间的间距
  align-items: center;
  justify-content: flex-start; // 修改为左对齐
  padding: 0 20px; // 增加左右内边距
}
.menu-item {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: rgba(255, 255, 255, 10%);
  }
}

// 当前激活的菜单项样式
.is-active {
  font-weight: bold;
  color: #fff;
  background-color: #007bff; // 使用一个醒目的颜色
}
</style>