<template>
  <section class="container mx-auto">
    <BlogCardListSkeleton v-if="isLoading" />
    <BlogCardList v-else :items="blogs" />
    <div class="mt-3">
      <b-pagination
        v-model="pagination.page"
        align="center"
        :limit="10"
        :total-rows="pagination.count"
        :per-page="pagination.offset"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </section>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { BPagination } from 'bootstrap-vue'
import BlogCardList from './Blog/BlogCardList.vue'
import BlogCardListSkeleton from './Blog/BlogCardListSkeleton.vue'
import useBlogStore from '@/stores/blog'
export default defineComponent({
  components: {
    BlogCardList,
    BlogCardListSkeleton,
    BPagination,
  },
  setup: () => {
    const blogStore = useBlogStore()
    const { list: blogs, pagination } = storeToRefs(blogStore)
    const isLoading = ref(false)

    const loadBlogs = async () => {
      try {
        isLoading.value = true
        await blogStore.getBlogs(pagination.value)
      } catch (error) {
      } finally {
        isLoading.value = false
      }
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
    }
  },
})
</script>
