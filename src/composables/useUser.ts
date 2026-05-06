import { ref } from 'vue'
import axios from '@/axios_in'

/** 
 * 全局用户信息响应式对象
 * 说明：用于在应用内共享已登录用户的基本信息
 */
export const globalUser = ref({ qid: "", icon: "", nickname: "", role: "" })

/**
 * 刷新全局用户信息
 * @returns Promise<void>
 */
export async function refreshGlobalUser() {
  try {
    const response = await axios.get('/api/user')
    globalUser.value = response.data
  } catch (error) {
    console.error('Failed to fetch user info:', error)
  }
}
