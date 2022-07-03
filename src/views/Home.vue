<template>
  <div class="flex flex-col gap-5">
    <BlogSortAndSearch @search="onSearch" />
    <BlogCardListSkeleton v-if="isLoading" />
    <BlogCardList v-else :items="blogs" />
    <b-pagination
      v-model="pagination.page"
      align="center"
      :limit="10"
      :total-rows="pagination.count"
      :per-page="pagination.offset"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script lang="ts">
import { BPagination } from 'bootstrap-vue'
import BlogCardList from './Blog/BlogCardList.vue'
import BlogCardListSkeleton from './Blog/BlogCardListSkeleton.vue'
import BlogSortAndSearch from './Blog/BlogSortAndSearch.vue'
import useBlog from '@/composables/useBlog'

export default defineComponent({
  components: {
    BlogCardList,
    BlogCardListSkeleton,
    BlogSortAndSearch,
    BPagination,
  },
  setup: () => {
    const { blogs, pagination, isLoading, onSearch } = useBlog()

    return {
      isLoading,
      blogs,
      pagination,

      onSearch,
    }
  },
})
</script>
