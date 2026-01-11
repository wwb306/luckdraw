<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
    <div class="bg-slate-800 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden">
      <!-- Header -->
      <div class="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/50 shrink-0">
        <h2 class="text-2xl font-bold text-white flex items-center gap-2">
          <FileSpreadsheet class="text-purple-500" />
          系统设置
        </h2>
        <button @click="$emit('close')" class="text-slate-400 hover:text-white transition-colors">
          <X class="w-6 h-6" />
        </button>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar text-white">
        <!-- Stats -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
            <div class="text-3xl font-bold text-blue-400">{{ participantCount }}</div>
            <div class="text-sm text-slate-400">已导入人数</div>
          </div>
          <div class="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
            <div class="text-3xl font-bold text-purple-400">{{ prizeCount }}</div>
            <div class="text-sm text-slate-400">已导入奖项组</div>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Global Import -->
          <div class="bg-gradient-to-r from-slate-800 to-slate-700 p-8 rounded-xl border border-slate-600 border-dashed text-center">
              <div class="mb-4">
                <h3 class="text-xl font-bold text-white mb-2">一键导入配置</h3>
                <p class="text-slate-400 text-sm">
                  请上传包含 <span class="text-blue-300 font-mono">人员名单</span> 和 <span class="text-purple-300 font-mono">奖品配置</span> Sheet的Excel文件
                </p>
              </div>
              
              <label class="inline-flex cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3 rounded-full font-bold text-lg items-center gap-2 transition-all shadow-lg hover:shadow-purple-500/25 hover:scale-105 active:scale-95">
                <Upload class="w-5 h-5" />
                选择 Excel 文件
                <input type="file" accept=".xlsx, .xls" @change="handleGlobalUpload" class="hidden" />
              </label>
          </div>

          <!-- Prize Image Management -->
          <div v-if="prizes.length > 0" class="bg-slate-700/30 p-6 rounded-xl border border-slate-700">
            <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ImageIcon class="w-5 h-5 text-yellow-500" />
                奖品图片管理
            </h3>
            <div class="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              <div v-for="prize in prizes" :key="prize.id" class="flex items-center justify-between bg-slate-800/80 p-3 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                <div class="flex items-center gap-4">
                  <!-- Preview -->
                  <div class="w-14 h-14 rounded-lg bg-slate-900 overflow-hidden flex-shrink-0 border border-slate-600 relative group">
                    <img v-if="prize.image" :src="prize.image" alt="" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-slate-600">
                      <ImageIcon class="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <div class="text-sm font-bold text-white flex items-center gap-2">
                       {{ prize.tier }}
                       <Check v-if="prize.image" class="w-3 h-3 text-green-500" />
                    </div>
                    <div class="text-xs text-slate-400">{{ prize.name }}</div>
                  </div>
                </div>
                
                <label class="cursor-pointer text-xs font-medium bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-md transition-all border border-slate-600 hover:border-slate-500 shadow-sm flex items-center gap-2">
                  <Upload class="w-3 h-3" />
                  {{ prize.image ? '更换' : '上传' }}
                  <input 
                    type="file" 
                    accept="image/*" 
                    class="hidden" 
                    @change="(e) => handleImageChange(prize, e)"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-slate-700 bg-slate-900/50 flex justify-end shrink-0">
           <button 
              @click="handleDownloadTemplate"
              class="text-sm text-slate-400 hover:text-white flex items-center gap-2 hover:underline underline-offset-4 transition-all"
            >
              <Download class="w-4 h-4" /> 下载上传文件模板
           </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Upload, Download, FileSpreadsheet, X, Image as ImageIcon, Check } from 'lucide-vue-next'
import { useProjectStore } from '../store/project'
import type { Prize } from '../types'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const props = defineProps<{
  isOpen: boolean
  participantCount: number
  prizeCount: number
  prizes: Prize[]
  projectId: string
}>()

const emit = defineEmits(['close'])

const projectStore = useProjectStore()

const handleGlobalUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    try {
      await projectStore.importData(props.projectId, target.files[0])
      alert("导入成功")
      target.value = ''
    } catch (err) {
      alert("导入失败，请检查模板。")
    }
  }
}

const handleImageChange = (prize: Prize, e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        // Since we are now server-based, we'd ideally upload this to the server
        // For simplicity, we'll assume the prize image logic is handled or to be implemented
        // In this migration, we'll skip the actual server upload for now or just mock it
        console.log("Image updated locally (base64):", event.target.result)
        // onUpdatePrize({ ...prize, image: event.target.result as string });
      }
    }
    reader.readAsDataURL(file)
  }
}

const handleDownloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    
    // 人员名单 Sheet
    const wsParticipants = XLSX.utils.json_to_sheet([
        { "姓名": "张三", "工号": "001", "部门": "技术部" },
        { "姓名": "李四", "工号": "002", "部门": "市场部" }
    ]);
    XLSX.utils.book_append_sheet(wb, wsParticipants, "人员名单");
    
    // 奖项配置 Sheet
    const wsPrizes = XLSX.utils.json_to_sheet([
        { "等级": "一等奖", "名称": "MacBook Pro", "人数": 1 },
        { "等级": "二等奖", "名称": "iPhone 16", "人数": 2 },
        { "等级": "三等奖", "名称": "iPad Air", "人数": 5 }
    ]);
    XLSX.utils.book_append_sheet(wb, wsPrizes, "奖项配置");
    
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "抽奖模板.xlsx");
}
</script>
