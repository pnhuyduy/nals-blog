<template>
  <b-skeleton-wrapper :loading="state.loading">
    <template #loading>
      <b-card class="blog__content">
        <template #header>
          <b-skeleton width="60%"></b-skeleton>
        </template>

        <b-skeleton width="55%"></b-skeleton>
        <b-skeleton width="70%"></b-skeleton>
      </b-card>
    </template>

    <b-card>
      <template #header>
        <h1>{{ state.title }}</h1>
      </template>
      <div class="blog__content">
        {{ state.content }}
      </div>
      <template #footer>
        <h5 class="text-muted">Tạo lúc {{ state.created_at | readableDate }}</h5>
      </template>
    </b-card>
  </b-skeleton-wrapper>
</template>

<script lang="ts">
import { BCard, BSkeleton, BSkeletonWrapper } from 'bootstrap-vue'
import useBlogStore from '@/stores/blog'
import dayjs from '@/libs/day'
export default defineComponent({
  name: 'Blog',
  components: {
    BSkeletonWrapper,
    BSkeleton,
    BCard,
  },
  filters: {
    readableDate(value: string) {
      return dayjs(value).format('HH:MM DD/MM/YYYY')
    },
  },
  setup(props, { root: { $route } }) {
    const blogStore = useBlogStore()
    const state = reactive({
      loading: true,
      title: '',
      content: '',
      created_at: null,
      updated_at: null,
    })

    const getBlogById = async (id: number) => {
      try {
        const response = await blogStore.getBlogById(id)
        const { title, content, image, created_at, updated_at } = response.data.data

        Object.assign(state, {
          title,
          content,
          image,
          created_at,
          updated_at,
        })

        state.loading = false
      } catch (error) {}
    }

    onMounted(async () => {
      const { id } = $route.params
      await getBlogById(id)
    })
    return {
      state,
    }
  },
})
</script>

<style lang="scss">
.blog__content {
  height: 500px;
}
</style>
