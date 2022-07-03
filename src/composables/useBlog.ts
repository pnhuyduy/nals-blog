import { storeToRefs } from 'pinia'
import type { BlogPayload, QueryBlogParams } from '@/api/blog'
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

export const useBlogEditor = () => {
  const vm = getCurrentInstance().proxy
  const $router = vm.$router
  const blogStore = useBlogStore()
  const submitting = ref(false)
  const state = reactive<BlogPayload>({
    id: null,
    title: '',
    content: '',
    image: null,
  })
  const previewImage = ref('')

  const getBlogById = async (id: number | string) => {
    try {
      const response = await blogStore.getBlogById(id)
      const { id: blogId, title, content, image } = response.data.data

      state.id = blogId
      state.title = title
      state.content = content

      previewImage.value = image.url
    } catch (error) {
      $router.push('/manager')
    }
  }

  const removeImage = () => {
    state.image = null
    previewImage.value = ''
  }

  const onFileChange = e => {
    const file = e.target.files[0]
    previewImage.value = URL.createObjectURL(file)
  }

  return {
    submitting,
    state,
    previewImage,
    removeImage,
    onFileChange,
    getBlogById,
  }
}
