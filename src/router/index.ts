// 代码说明:

// 我们使用 createRouter 和 createWebHistory 来创建一个基于浏览器历史记录的路由实例。
// routes 数组定义了所有的路由规则。
// 我们定义了根路径 /，并将其命名为 Dashboard。
// component: () => import(...) 是一种懒加载技术。这意味着 Dashboard.vue 组件只会在用户访问
// 根路径时才会被加载，这有助于优化应用的初始加载速度。
// 我在 meta 字段中增加了一个 title，方便我们在后续的开发中用它来设置菜单名或浏览器标题。
// 
//  在 import 语句中，RouteRecordRaw 的前面加上了 
// type 关键字。这明确地告诉 TypeScript，我们只是在导入一个类型，从而满足了 verbatimModuleSyntax 的编译要求。
// 
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomePage',
    // 我们将使用动态导入（懒加载）来加载页面组件
    component: () => import('@/views/HomePage.vue'),
    meta: {
      title: '综合态势'
    }
  },
  {
    path: '/page01',
    name: 'Page01',
    component: () => import('@/views/Page01.vue'),
    meta: {
      title: '功能页面一'
    }
  },
  {
    path: '/page02',
    name: 'Page02',
    component: () => import('@/views/Page02.vue'),
    meta: {
      title: '功能页面二'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router