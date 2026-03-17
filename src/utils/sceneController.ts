import { reactive } from 'vue'

/**
 * 定义场景可能的状态
 * - 'HOME': 显示地图和完整的楼宇模型
 * - 'FLOOR_1': 显示一楼模型
 * - 'FLOOR_2': 显示二楼模型
 */
export type SceneState = 'HOME' | 'FLOOR_1' | 'FLOOR_2'

export const sceneState = reactive<{
  activeView: SceneState
}>({
  activeView: 'HOME', // 默认状态
})
