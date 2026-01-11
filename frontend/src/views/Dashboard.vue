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
            <h1 class="text-xl font-bold">Lucky Draw Pro</h1>
            <p class="text-xs text-slate-400">Server Management</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto p-6">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold">Your Projects</h2>
        <button
          @click="isModalOpen = true"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus class="w-5 h-5" />
          New Project
        </button>
      </div>

      <div v-if="projectStore.loading" class="text-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p class="text-slate-400 mt-4">Loading projects...</p>
      </div>

      <div v-else-if="projectStore.projects.length === 0" class="text-center py-20 bg-slate-800 rounded-xl border border-slate-700 border-dashed">
        <Package class="w-16 h-16 mx-auto text-slate-600 mb-4" />
        <h3 class="text-xl font-semibold text-slate-300">No projects yet</h3>
        <p class="text-slate-500 mt-2">Create your first lottery event to get started.</p>
        <button
          @click="isModalOpen = true"
          class="mt-6 text-blue-400 hover:text-blue-300 font-medium"
        >
          Create a project
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
              title="Delete Project"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
          
          <p class="text-slate-400 text-sm mb-6 line-clamp-2 h-10">
            {{ project.description || 'No description' }}
          </p>

          <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-700 pt-4">
            <div class="flex items-center gap-1">
              <Calendar class="w-3 h-3" />
              {{ new Date(project.created_at).toLocaleDateString() }}
            </div>
            <div class="flex items-center gap-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Open <ExternalLink class="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- New Project Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md text-gray-900">
        <h3 class="text-xl font-bold mb-4">Create New Project</h3>
        <form @submit.prevent="handleCreateProject" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              v-model="newProjectName"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Annual Meeting 2025"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              v-model="newProjectDesc"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Brief description of the event"
              rows="3"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Password (Optional)
            </label>
            <div class="relative">
              <input
                v-model="newProjectPassword"
                type="password"
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Set a password for this project"
              />
              <Lock class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <p class="text-xs text-gray-400 mt-1">Leave blank for no password protection.</p>
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              @click="closeCreateModal"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!newProjectName.trim()"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              Create Project
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
          <h3 class="text-xl font-bold">Password Required</h3>
        </div>
        <p class="text-sm text-gray-600 mb-6">
          Please enter the password to access <strong>{{ verifyingProject.name }}</strong>.
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
              placeholder="Enter password"
            />
            <p v-if="passwordError" class="text-xs text-red-500 mt-1">Incorrect password. Please try again.</p>
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              @click="verifyingProject = null"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Verify & Open
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
  if (confirm('Are you sure you want to delete this project? This cannot be undone.')) {
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
