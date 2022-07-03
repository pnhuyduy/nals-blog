import { defineStore } from 'pinia'
import type { BlogPayload, QueryBlogParams } from '@/api/blog'
import * as blogAPI from '@/api/blog'

import type { Blog, Nullable, Pagination } from '@/types'

interface State {
  list: Blog[]
  pagination: Pagination
  editBlog: {
    title: string
    content: string
    image: Nullable<string>
  }
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
      editBlog: {
        title: '',
        content: '',
        image: '',
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
    async getBlogById(id: number) {
      return await blogAPI.getBlogById(id)
    },
    async createBlog(blog: BlogPayload) {
      return await blogAPI.createBlog(blog)
    },
    async updateBlog(id: number, blog: BlogPayload) {
      return await blogAPI.updateBlog(id, blog)
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
