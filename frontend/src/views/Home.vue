<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <!-- Header -->
    <header class="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-10">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-3">
          <div class="bg-blue-600 p-2 rounded-lg">
            <LayoutGrid class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-xl font-bold">个人工具箱</h1>
            <p class="text-xs text-slate-400">日常实用工具</p>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="relative w-full md:w-96">
          <Search class="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索工具..."
            class="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="tool in filteredTools"
          :key="tool.id"
          @click="router.push(tool.route)"
          class="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
        >
          <div class="flex items-start gap-4 mb-4">
            <div class="p-3 rounded-lg bg-slate-700 group-hover:bg-blue-600 transition-colors">
              <component :is="tool.icon" class="w-6 h-6 text-blue-400 group-hover:text-white" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                {{ tool.name }}
              </h3>
              <div class="flex gap-1 mt-1">
                <span
                  v-for="tag in tool.tags"
                  :key="tag"
                  class="text-[10px] uppercase tracking-wider bg-slate-700 px-1.5 py-0.5 rounded text-slate-400"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
          
          <p class="text-slate-400 text-sm mb-6 line-clamp-2 h-10">
            {{ tool.description }}
          </p>

          <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-700 pt-4">
            <span class="flex items-center gap-1">
              点击打开
            </span>
            <div class="flex items-center gap-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              启动 <ExternalLink class="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredTools.length === 0" class="text-center py-20 bg-slate-800 rounded-xl border border-slate-700 border-dashed mt-6">
        <Search class="w-16 h-16 mx-auto text-slate-600 mb-4" />
        <h3 class="text-xl font-semibold text-slate-300">未找到相关工具</h3>
        <p class="text-slate-500 mt-2">尝试搜索其他内容。</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { LayoutGrid, Search, ExternalLink, Package } from 'lucide-vue-next'
import type { Tool } from '../types'

const router = useRouter()
const searchQuery = ref('')

const tools = ref<Tool[]>([
  {
    id: 'lucky-draw',
    name: '抽奖专业版',
    description: '功能强大的年会或活动抽奖系统。管理参与者、奖品并导出结果。',
    icon: Package,
    route: '/lucky-draw',
    tags: ['活动', '实用']
  }
])

const filteredTools = computed(() => {
  if (!searchQuery.value.trim()) return tools.value
  const query = searchQuery.value.toLowerCase()
  return tools.value.filter(tool => 
    tool.name.toLowerCase().includes(query) || 
    tool.description.toLowerCase().includes(query) ||
    tool.tags.some(tag => tag.toLowerCase().includes(query))
  )
})
</script>
