import axios from '@/libs/axios'
import type { Blog, Nullable, Pagination } from '@/types'

export type SortBy = 'id' | 'title' | 'content' | 'created_at' | 'updated_at'
export type SortDirection = 'asc' | 'desc'

export interface QueryBlogParams {
  page?: number
  offset?: number
  search?: string
  sort_by?: SortBy
  sort_direction?: SortDirection
}

interface BlogListResponse {
  data: {
    items: Blog[]
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

export interface BlogPayload {
  id?: Nullable<number>
  title: string
  content: string
  image?: Nullable<File | string>
}

interface BlogResponse {
  data: Blog
}

export const getBlogById = async (id: number) => await axios.get<BlogResponse>(`api/v2/blogs/${id}`)

export const createBlog = async (blog: BlogPayload) => {
  const { title, content, image } = blog
  const formData = new FormData()
  formData.append('blog[title]', title)
  formData.append('blog[content]', content)
  if (image instanceof File) formData.append('blog[image]', image as File)
  return await axios.post<BlogResponse>('api/v2/blogs', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const updateBlog = async (id: number, blog: BlogPayload) => {
  const { title, content, image } = blog
  const formData = new FormData()
  formData.append('blog[title]', title)
  formData.append('blog[content]', content)
  if (image) formData.append('blog[image]', image as File)
  else if (image === null) formData.append('blog[image]', '')

  return await axios.put<BlogResponse>(`api/v2/blogs/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deleteBlog = async (id: number) => await axios.delete(`api/v2/blogs/${id}`)
