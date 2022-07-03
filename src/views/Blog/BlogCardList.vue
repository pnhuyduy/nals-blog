<template>
  <div class="flex flex-wrap -m-2">
    <div v-for="(blog, index) in items" :key="index" class="w-full p-2 md:w-1/2 lg:w-1/3">
      <BlogCard
        :title="blog.title"
        :content="blog.content"
        :image="blog.image.url"
        :comments-count="blog.comments_count"
        :created-at="blog.created_at"
      />
    </div>
  </div>
</template>

<script lang="ts">
import BlogCard from './BlogCard.vue'
export default defineComponent({
  components: {
    BlogCard,
  },
  props: {
    isLoaded: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
})
</script>
