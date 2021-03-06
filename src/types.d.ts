export type Nullable<T> = T | null

interface Pagination {
  count: number
  page: number
  offset: number
  total: number
  prev?: any
  next?: any
}

interface Image {
  url: string
}
export interface Blog {
  id: Nullable<number>
  title: string
  content: string
  image: Image
  created_at: Date
  updated_at: Date
  comments_count: number
}

interface User {
  email: string
  name: string
  avatar: Image
  created_at: string
  email: string
}

export interface SearchTerm {
  search: string
  sort_by: SortBy
  sort_direction: SortDirection
}
