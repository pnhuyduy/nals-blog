import { defineStore } from 'pinia'
import type { QueryBlogParams } from '@/api/blog'
import * as blogAPI from '@/api/blog'
import type { Blog, Pagination } from '@/types'

interface State {
  list: Blog[]
  pagination: Pagination
}

export default defineStore('useBlog', {
  state: (): State => {
    return {
      list: [],
      pagination: {
        count: 0,
        page: 1,
        offset: 9,
        total: 0,
        next: null,
        prev: null,
      },
    }
  },
  actions: {
    async getBlogs(params: QueryBlogParams) {
      const response = await blogAPI.getBlogs(params)
      const { data, pagination } = response.data

      this.$patch(state => {
        state.list = data.items
        state.pagination = pagination
      })
    },
    async deleteBlog(id: number) {
      try {
        const index = this.list.findIndex(blog => blog.id === id)
        await blogAPI.deleteBlog(id)
        this.$patch(state => {
          state.list.splice(index, 1)
        })
        return true
      } catch (error) {
        return false
      }
    },
  },
})
