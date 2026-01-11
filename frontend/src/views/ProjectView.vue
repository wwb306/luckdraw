<template>
  <div v-if="project" class="flex h-screen bg-slate-900 text-white overflow-hidden font-sans">
    <!-- Sidebar -->
    <Sidebar 
      v-model:currentPrizeId="currentPrizeId"
      :prizes="project.prizes" 
      :winners="project.winners"
    />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col relative min-w-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950">
      
      <!-- Top Bar -->
      <header class="h-20 border-b border-slate-700 bg-slate-900/80 backdrop-blur-md flex justify-between items-center px-8 shrink-0 z-10">
        <div class="flex items-center gap-3">
           <button
              @click="onExit"
              class="p-2 -ml-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Back to Dashboard"
           >
              <ArrowLeft class="w-5 h-5" />
           </button>
           <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg shadow-lg shadow-purple-900/50">
              <Gift class="w-6 h-6 text-white" />
           </div>
           <h1 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              {{ project.name }}
           </h1>
        </div>
        
        <div class="flex items-center gap-3">
          <button 
            @click="handleExport"
            class="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition-colors border border-slate-700"
          >
            <Download class="w-4 h-4" /> 导出结果
          </button>
          <button 
            @click="handleReset"
            class="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-900/30 text-slate-200 hover:text-red-400 hover:border-red-900 rounded-lg text-sm font-medium transition-all border border-slate-700"
          >
            <RefreshCcw class="w-4 h-4" /> 重置
          </button>
          <button 
            @click="showConfig = true"
            class="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
          >
            <Settings class="w-5 h-5" />
          </button>
        </div>
      </header>

      <!-- Main Body -->
      <main class="flex-1 overflow-y-auto p-8 flex flex-col items-center">
        
        <div v-if="currentPrize" class="w-full max-w-[1600px] flex flex-col items-center gap-10">
            
            <!-- 1. Rolling Area / Stage -->
            <div class="w-full min-h-[300px] flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50 relative overflow-hidden">
                <!-- Background decoration -->
                <div class="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>

                <div v-if="displayParticipants.length > 0" 
                    :class="[
                        'grid gap-8 w-full transition-all duration-300 z-10',
                        displayParticipants.length === 1 ? 'grid-cols-1 max-w-lg' : '',
                        displayParticipants.length > 1 && displayParticipants.length <= 4 ? 'grid-cols-2 max-w-4xl' : '',
                        displayParticipants.length > 4 && displayParticipants.length <= 8 ? 'grid-cols-3 md:grid-cols-4' : '',
                        displayParticipants.length > 8 ? 'grid-cols-4 md:grid-cols-5' : ''
                    ]"
                >
                    <div 
                        v-for="(p, idx) in displayParticipants"
                        :key="idx"
                        :class="[
                            'relative flex flex-col items-center justify-center bg-slate-800 border-2 rounded-2xl shadow-2xl overflow-hidden p-6 group',
                            displayParticipants.length === 1 ? 'h-64' : 'h-48',
                            isRolling ? 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)] scale-105' : 'border-yellow-500/50 shadow-yellow-500/10'
                        ]"
                    >
                        <div class="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40">
                            <Gift class="w-8 h-8" />
                        </div>
                        
                        <span :class="[
                            'font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-200 text-center',
                            displayParticipants.length === 1 ? 'text-6xl mb-4' : 'text-3xl mb-2'
                        ]">
                            {{ p.name }}
                        </span>
                        <span :class="[
                            'font-mono text-slate-400 bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-700',
                            displayParticipants.length === 1 ? 'text-2xl' : 'text-sm'
                        ]">
                            {{ p.um }}
                        </span>
                    </div>
                </div>
                <div v-else class="text-center space-y-6 py-12 z-10">
                    <div class="inline-flex p-6 rounded-full bg-slate-800 border border-slate-700 text-slate-500">
                        <Users class="w-10 h-10" />
                    </div>
                    <h3 class="text-2xl text-slate-400 font-medium">准备好开始了吗？</h3>
                    <p class="text-slate-500 text-lg">
                        本轮将抽取 <span class="text-purple-400 font-bold text-xl mx-1">{{ batchSize }}</span> 位幸运儿
                    </p>
                </div>
            </div>

            <!-- 2. Controls -->
            <div class="z-10">
                <button v-if="!isRolling"
                    @click="handleStart"
                    :disabled="isFinished"
                    class="group relative px-14 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-2xl text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center gap-4"
                >
                    <Play class="w-8 h-8 fill-current" />
                    {{ isFinished ? '该奖项已结束' : '开始抽奖' }}
                </button>
                <button v-else
                    @click="handleStop"
                    class="group px-14 py-5 bg-red-600 hover:bg-red-500 rounded-full font-bold text-2xl text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
                >
                    <Square class="w-8 h-8 fill-current" />
                    停止滚动
                </button>
            </div>

            <!-- 3. Winners List (History for current prize) -->
            <div v-if="currentPrizeWinners.length > 0" class="w-full bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden mt-2 shadow-xl">
                <div class="p-6 bg-slate-800 border-b border-slate-700 flex justify-between items-center text-white">
                    <h3 class="text-xl font-bold text-white flex items-center gap-3">
                        <Gift class="w-6 h-6 text-yellow-500" />
                        获奖名单 ({{ currentPrizeWinners.length }})
                    </h3>
                    <span class="text-sm text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
                        {{ currentPrize.name }}
                    </span>
                </div>
                <div class="p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    <div v-for="winner in currentPrizeWinners" :key="winner.id" class="bg-slate-700/60 p-5 rounded-xl border border-slate-600 flex flex-col items-center gap-2 hover:bg-slate-700 hover:border-slate-500 transition-all hover:scale-105 shadow-sm">
                        <span class="text-white font-bold text-xl md:text-2xl truncate w-full text-center">{{ getParticipantName(winner.participant_id) }}</span>
                        <span class="text-sm md:text-base text-slate-400 font-mono bg-slate-800/50 px-2 py-0.5 rounded">{{ getParticipantUM(winner.participant_id) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center h-full text-slate-500 mt-20">
            <div class="p-8 bg-slate-800 rounded-full mb-8">
               <Gift class="w-20 h-20 text-slate-600" />
            </div>
            <p class="text-2xl font-medium">请在左侧选择一个奖项开始抽奖</p>
            <p class="text-lg mt-3 text-slate-600">选择后将展示对应的奖品图和剩余名额</p>
        </div>
      </main>

      <!-- Configuration Modal -->
      <ConfigPanel 
          :isOpen="showConfig" 
          @close="showConfig = false"
          :participantCount="project.participants.length"
          :prizeCount="project.prizes.length"
          :prizes="project.prizes"
          :projectId="id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import confetti from 'canvas-confetti'
import { Settings, Play, Square, RefreshCcw, Download, Gift, Users, ArrowLeft } from 'lucide-vue-next'
import Sidebar from '../components/Sidebar.vue'
import ConfigPanel from '../components/ConfigPanel.vue'
import { useProjectStore } from '../store/project'
import type { Participant, Prize } from '../types'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const projectStore = useProjectStore()

const currentPrizeId = ref<string | null>(null)
const isRolling = ref(false)
const displayParticipants = ref<Participant[]>([])
const showConfig = ref(false)
const rollInterval = ref<number | null>(null)

const project = computed(() => projectStore.currentProject)
const currentPrize = computed(() => project.value?.prizes.find(p => p.id === currentPrizeId.value))
const currentPrizeWinners = computed(() => project.value?.winners.filter(w => w.prize_id === currentPrizeId.value) || [])

const batchSize = computed(() => {
    if (!currentPrize.value) return 1
    return currentPrize.value.count - currentPrizeWinners.value.length
})

const isFinished = computed(() => {
    if (!currentPrize.value) return false
    return currentPrizeWinners.value.length >= currentPrize.value.count
})

onMounted(() => {
  projectStore.fetchProjectDetail(props.id)
})

onUnmounted(() => {
  if (rollInterval.value) clearInterval(rollInterval.value)
})

watch(currentPrizeId, () => {
  displayParticipants.value = []
  isRolling.value = false
  if (rollInterval.value) {
    clearInterval(rollInterval.value)
    rollInterval.value = null
  }
})

const getAvailableParticipants = () => {
    if (!project.value) return []
    const allWinnerIds = new Set(project.value.winners.map(w => w.participant_id))
    return project.value.participants.filter(p => !allWinnerIds.has(p.id))
}

const handleStart = () => {
    if (!currentPrize.value) return
    if (isFinished.value) return
    
    const available = getAvailableParticipants()
    if (available.length === 0) {
      alert("已无人员可参与抽奖！")
      return
    }

    const drawCount = Math.min(batchSize.value, available.length)
    if (drawCount === 0) return

    isRolling.value = true
    rollInterval.value = window.setInterval(() => {
      const randomParts: Participant[] = []
      for (let i = 0; i < drawCount; i++) {
        const randomIdx = Math.floor(Math.random() * available.length)
        randomParts.push(available[randomIdx])
      }
      displayParticipants.value = randomParts
    }, 50)
}

const handleStop = async () => {
    if (!rollInterval.value || !currentPrize.value) return

    clearInterval(rollInterval.value)
    rollInterval.value = null
    isRolling.value = false

    const available = getAvailableParticipants()
    if (available.length === 0) return

    const drawCount = Math.min(batchSize.value, available.length)
    const shuffled = [...available].sort(() => 0.5 - Math.random())
    const winners = shuffled.slice(0, drawCount)

    displayParticipants.value = winners

    // Record to server
    const drawData = winners.map(p => ({
        prize_id: currentPrize.value!.id,
        participant_id: p.id
    }))
    
    await projectStore.recordWinners(props.id, drawData)
    triggerConfetti()
}

const handleReset = () => {
    if (confirm("确定要重置所有抽奖数据吗？这将清空所有中奖记录。")) {
        // Server-side reset logic would be needed here
        // For now, we can just alert that it's not implemented yet or implement a reset API
        alert("重置功能需后端支持。")
    }
}

const handleExport = () => {
    if (!project.value) return
    const wb = XLSX.utils.book_new()
    
    const exportData = project.value.winners.map(w => {
        const p = project.value!.participants.find(p => p.id === w.participant_id)
        const prz = project.value!.prizes.find(prz => prz.id === w.prize_id)
        return {
            "奖项等级": prz?.tier,
            "奖项名称": prz?.name,
            "姓名": p?.name,
            "工号": p?.um,
            "部门": p?.department,
            "中奖时间": new Date(w.won_at).toLocaleString()
        }
    })
    
    const ws = XLSX.utils.json_to_sheet(exportData)
    XLSX.utils.book_append_sheet(wb, ws, "中奖结果")
    
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), `${project.value.name}-中奖结果.xlsx`)
}

const onExit = () => {
  router.push('/')
}

const getParticipantName = (id: string) => project.value?.participants.find(p => p.id === id)?.name || 'Unknown'
const getParticipantUM = (id: string) => project.value?.participants.find(p => p.id === id)?.um || 'Unknown'

const triggerConfetti = () => {
    const duration = 3000
    const end = Date.now() + duration

    ;(function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#a855f7', '#ec4899', '#eab308']
      })
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#a855f7', '#ec4899', '#eab308']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }())
}
</script>
