import { getFormData } from './helpers'
import axios from '@/libs/axios'

interface QueryBlogParams {
  page?: number
  offset?: number
  search?: string
  sort_by?: 'id' | 'title' | 'content' | 'created_at' | 'updated_at'
  sort_direction?: 'asc' | 'desc'
}

interface BlogListResponse {
  data: {
    items: Blog
  }
  pagination: Pagination
}

export const getBlogs = async (
  params: QueryBlogParams = {
    page: 1,
    offset: 20,
    search: '',
    sort_by: 'created_at',
    sort_direction: 'desc',
  }
) => {
  return await axios.get<BlogListResponse>('api/v2/blogs', {
    params,
  })
}

interface BlogPayload {
  title: String
  content: String
  image?: File
}

interface BlogResponse {
  data: Blog
}

export const createBlog = async (blog: BlogPayload) => {
  const payload = getFormData(blog)
  return await axios.post<BlogResponse>('api/v2/blogs', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const updateBlog = async (id: number, blog: BlogPayload) => {
  const payload = getFormData(blog)
  return await axios.put<BlogResponse>(`api/v2/blogs/${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deleteBlog = async (id: number) => await axios.delete(`api/v2/blogs/${id}`)
