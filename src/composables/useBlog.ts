import { storeToRefs } from 'pinia'
import type { QueryBlogParams } from '@/api/blog'
import type { SearchTerm } from '@/types'
import useBlogStore from '@/stores/blog'

export default () => {
  const blogStore = useBlogStore()
  const { list: blogs, pagination } = storeToRefs(blogStore)
  const isLoading = ref(false)
  const searchTerm = reactive<SearchTerm>({
    search: '',
    sort_by: 'created_at',
    sort_direction: 'desc',
  })

  const loadBlogs = async () => {
    if (isLoading.value) return
    try {
      isLoading.value = true
      const { page, offset } = pagination.value
      const { search, sort_by, sort_direction } = searchTerm
      const queryParams: QueryBlogParams = {
        page,
        offset,
        search,
        sort_by,
        sort_direction,
      }

      await blogStore.getBlogs(queryParams)
    } catch (error) {
    } finally {
      isLoading.value = false
    }
  }

  const deleteBlog = async (id: number) => {
    try {
      isLoading.value = true
      await blogStore.deleteBlog(id)
    } catch (error) {
    } finally {
      isLoading.value = false
    }
  }

  const onSearch = async (payload: SearchTerm) => {
    Object.assign(searchTerm, payload)

    await loadBlogs()
  }

  watch(
    () => pagination.value.page,
    async () => {
      await loadBlogs()
    }
  )

  onMounted(async () => {
    await loadBlogs()
  })

  return {
    isLoading,
    blogs,
    pagination,
    searchTerm,

    deleteBlog,
    onSearch,
  }
}
