import { defineStore } from 'pinia'
import axios from 'axios'
import type { Project, ProjectDetail } from '../types'

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [] as Project[],
    currentProject: null as ProjectDetail | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchProjects() {
      this.loading = true
      try {
        const response = await axios.get('/api/projects/')
        this.projects = response.data
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async fetchProjectDetail(id: string) {
      this.loading = true
      try {
        const response = await axios.get(`/api/projects/${id}`)
        this.currentProject = response.data
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async createProject(name: string, description?: string, password?: string) {
      try {
        const response = await axios.post('/api/projects/', { name, description, password })
        this.projects.push(response.data)
        return response.data
      } catch (err: any) {
        this.error = err.message
        throw err
      }
    },
    async deleteProject(id: string) {
      try {
        await axios.delete(`/api/projects/${id}`)
        this.projects = this.projects.filter(p => p.id !== id)
      } catch (err: any) {
        this.error = err.message
      }
    },
    async importData(projectId: string, file: File) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        await axios.post(`/api/projects/${projectId}/import`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        await this.fetchProjectDetail(projectId)
      } catch (err: any) {
        this.error = err.message
        throw err
      }
    },
    async recordWinners(projectId: string, winners: { prize_id: string, participant_id: string }[]) {
      try {
        await axios.post(`/api/projects/${projectId}/draw`, winners)
        if (this.currentProject) {
            // Optimistically update or just re-fetch
            await this.fetchProjectDetail(projectId)
        }
      } catch (err: any) {
        this.error = err.message
      }
    }
  }
})
