<template>
  <div class="w-[420px] bg-slate-800 border-r border-slate-700 flex flex-col h-full shrink-0 z-20 shadow-2xl relative transition-all duration-300">
    <!-- Header -->
    <div class="p-8 border-b border-slate-700 bg-slate-900/50">
      <h2 class="text-2xl font-bold text-slate-100 flex items-center gap-3">
        <Trophy class="w-8 h-8 text-yellow-500" />
        奖项选择
      </h2>
    </div>
    
    <div class="flex-1 p-8 flex flex-col gap-10 overflow-y-auto custom-scrollbar">
      <!-- Dropdown Selection -->
      <div class="relative z-20 shrink-0">
          <label class="block text-base text-slate-400 mb-3 font-medium">当前抽取奖项</label>
          <div class="relative group">
              <select 
                  :value="currentPrizeId || ''"
                  @change="$emit('update:currentPrizeId', ($event.target as HTMLSelectElement).value)"
                  class="w-full appearance-none bg-slate-700 border border-slate-600 text-white text-xl py-4 px-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg cursor-pointer hover:bg-slate-600 transition-all font-semibold pr-12"
              >
                  <option value="" disabled>-- 请选择奖项 --</option>
                  <option v-for="p in prizes" :key="p.id" :value="p.id">
                      {{ p.tier }} - {{ p.name }} {{ isPrizeFinished(p) ? '(已抽完)' : '' }}
                  </option>
              </select>
              <div class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-white transition-colors">
                  <ChevronDown class="w-6 h-6" />
              </div>
           </div>
      </div>

      <!-- Prize Image Display -->
      <div class="flex-1 flex flex-col items-center min-h-0">
           <div v-if="currentPrize" class="w-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
              
              <!-- Image Container - Fixed Height Forced -->
              <div class="relative w-full h-[340px] bg-slate-900 rounded-2xl overflow-hidden border-4 border-slate-700 shadow-2xl mb-8 group shrink-0 text-white">
                  <img v-if="currentPrize.image" :src="currentPrize.image" alt="prize" class="w-full h-full object-contain bg-slate-900" />
                  <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <Gift class="w-32 h-32 text-slate-700 drop-shadow-lg" />
                  </div>
                  <!-- Overlay Badge -->
                  <div class="absolute top-0 left-0 bg-purple-600 text-white text-base font-bold px-4 py-2 rounded-br-xl shadow-lg z-10">
                      {{ currentPrize.tier }}
                  </div>
              </div>

              <h3 class="text-3xl font-bold text-white text-center mb-4 drop-shadow-md shrink-0">
                  {{ currentPrize.name }}
              </h3>
              
              <!-- Stats Card -->
              <div class="w-full bg-slate-700/50 rounded-xl p-5 border border-slate-600 mt-2 shrink-0 text-white">
                  <div class="flex justify-between items-center text-base mb-3">
                      <span class="text-slate-300">中奖进度</span>
                      <span class="text-white font-mono font-bold text-lg">
                          {{ getWinnersCount(currentPrize.id) }} / {{ currentPrize.count }}
                      </span>
                  </div>
                  <div class="w-full bg-slate-900 rounded-full h-3 overflow-hidden">
                      <div 
                          class="h-full rounded-full transition-all duration-700 ease-out"
                          :class="getWinnersCount(currentPrize.id) === currentPrize.count ? 'bg-green-500' : 'bg-purple-500'"
                          :style="{ width: `${(getWinnersCount(currentPrize.id) / currentPrize.count) * 100}%` }"
                      />
                  </div>
              </div>
           </div>
           <div v-else class="flex flex-col items-center justify-center h-80 text-slate-500 opacity-60">
              <Award class="w-24 h-24 mb-6" />
              <p class="text-lg">请选择左上角的奖项</p>
           </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Trophy, ChevronDown, Gift, Award } from 'lucide-vue-next'
import type { Prize, Winner } from '../types'
import { computed } from 'vue'

const props = defineProps<{
  prizes: Prize[]
  winners: Winner[]
  currentPrizeId: string | null
}>()

defineEmits(['update:currentPrizeId'])

const currentPrize = computed(() => props.prizes.find(p => p.id === props.currentPrizeId))

const getWinnersCount = (prizeId: string) => {
  return props.winners.filter(w => w.prize_id === prizeId).length
}

const isPrizeFinished = (prize: Prize) => {
  return getWinnersCount(prize.id) >= prize.count
}
</script>
