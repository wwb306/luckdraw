<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <!-- Header -->
    <header class="bg-slate-800 border-b border-slate-700 p-4">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="bg-blue-600 p-2 rounded-lg">
            <Package class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-xl font-bold">年会抽奖工具</h1>
            <p class="text-xs text-slate-400">后台管理</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto p-6">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold">抽奖项目</h2>
        <button
          @click="isModalOpen = true"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus class="w-5 h-5" />
          新建项目
        </button>
      </div>

      <div v-if="projectStore.loading" class="text-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p class="text-slate-400 mt-4">正在加载项目...</p>
      </div>

      <div v-else-if="projectStore.projects.length === 0" class="text-center py-20 bg-slate-800 rounded-xl border border-slate-700 border-dashed">
        <Package class="w-16 h-16 mx-auto text-slate-600 mb-4" />
        <h3 class="text-xl font-semibold text-slate-300">暂无项目</h3>
        <p class="text-slate-500 mt-2">创建您的第一个抽奖项目开始吧。</p>
        <button
          @click="isModalOpen = true"
          class="mt-6 text-blue-400 hover:text-blue-300 font-medium"
        >
          创建项目
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in projectStore.projects"
          :key="project.id"
          @click="handleProjectClick(project)"
          class="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-2 truncate pr-8">
              <h3 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                {{ project.name }}
              </h3>
              <Lock v-if="project.password" class="w-3.5 h-3.5 text-slate-500" />
            </div>
            <button
              @click.stop="handleDeleteProject(project.id)"
              class="text-slate-500 hover:text-red-400 transition-colors p-1"
              title="删除项目"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
          
          <p class="text-slate-400 text-sm mb-6 line-clamp-2 h-10">
            {{ project.description || '暂无描述' }}
          </p>

          <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-700 pt-4">
            <div class="flex items-center gap-1">
              <Calendar class="w-3 h-3" />
              {{ new Date(project.created_at).toLocaleDateString() }}
            </div>
            <div class="flex items-center gap-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              打开 <ExternalLink class="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- New Project Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md text-gray-900">
        <h3 class="text-xl font-bold mb-4">创建新项目</h3>
        <form @submit.prevent="handleCreateProject" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              项目名称
            </label>
            <input
              v-model="newProjectName"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="例如：2025年年会"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              描述 (可选)
            </label>
            <textarea
              v-model="newProjectDesc"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="简短描述活动内容"
              rows="3"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              密码 (可选)
            </label>
            <div class="relative">
              <input
                v-model="newProjectPassword"
                type="password"
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="为此项目设置密码"
              />
              <Lock class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <p class="text-xs text-gray-400 mt-1">留空表示不设置密码保护。</p>
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              @click="closeCreateModal"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              :disabled="!newProjectName.trim()"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              创建项目
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Password Verification Modal -->
    <div v-if="verifyingProject" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
      <div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm text-gray-900">
        <div class="flex items-center gap-3 mb-4 text-blue-600">
          <Shield class="w-8 h-8" />
          <h3 class="text-xl font-bold">需要输入密码</h3>
        </div>
        <p class="text-sm text-gray-600 mb-6">
          请输入密码以访问 <strong>{{ verifyingProject.name }}</strong>。
        </p>
        <form @submit.prevent="handleVerifyPassword" class="space-y-4">
          <div>
            <input
              v-model="passwordInput"
              type="password"
              required
              :class="[
                'w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none',
                passwordError ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
              ]"
              placeholder="输入密码"
            />
            <p v-if="passwordError" class="text-xs text-red-500 mt-1">密码错误，请重试。</p>
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              @click="verifyingProject = null"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              验证并打开
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Trash2, ExternalLink, Calendar, Package, Lock, Shield } from 'lucide-vue-next'
import { useProjectStore } from '../store/project'
import type { Project } from '../types'

const router = useRouter()
const projectStore = useProjectStore()

const isModalOpen = ref(false)
const newProjectName = ref('')
const newProjectDesc = ref('')
const newProjectPassword = ref('')

const verifyingProject = ref<Project | null>(null)
const passwordInput = ref('')
const passwordError = ref(false)

onMounted(() => {
  projectStore.fetchProjects()
})

const handleCreateProject = async () => {
  if (!newProjectName.value.trim()) return
  try {
    const project = await projectStore.createProject(
      newProjectName.value,
      newProjectDesc.value,
      newProjectPassword.value || undefined
    )
    router.push(`/project/${project.id}`)
    closeCreateModal()
  } catch (err) {
    // Error handled by store
  }
}

const closeCreateModal = () => {
  isModalOpen.value = false
  newProjectName.value = ''
  newProjectDesc.value = ''
  newProjectPassword.value = ''
}

const handleDeleteProject = async (id: string) => {
  if (confirm('确定要删除此项目吗？此操作无法撤销。')) {
    await projectStore.deleteProject(id)
  }
}

const handleProjectClick = (project: Project) => {
  if (project.password) {
    verifyingProject.value = project
    passwordInput.value = ''
    passwordError.value = false
  } else {
    router.push(`/project/${project.id}`)
  }
}

const handleVerifyPassword = () => {
  if (verifyingProject.value && passwordInput.value === verifyingProject.value.password) {
    const id = verifyingProject.value.id
    verifyingProject.value = null
    router.push(`/project/${id}`)
  } else {
    passwordError.value = true
  }
}
</script>
