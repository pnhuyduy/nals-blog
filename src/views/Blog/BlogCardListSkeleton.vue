<template>
  <div class="flex flex-wrap -m-2">
    <div v-for="(item, index) in 9" :key="index" class="w-full p-2 md:w-1/2 lg:w-1/3">
      <BlogCardSkeleton />
    </div>
  </div>
</template>

<script lang="ts">
import BlogCardSkeleton from './BlogCardSkeleton.vue'
export default defineComponent({
  components: {
    BlogCardSkeleton,
  },
})
</script>
