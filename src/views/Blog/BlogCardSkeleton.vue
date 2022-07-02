<template>
  <b-card class="flex flex-col cursor-pointer">
    <b-media>
      <template #aside>
        <div class="flex flex-col">
          <b-skeleton-img width="64" class="skeleton__img"></b-skeleton-img>
        </div>
      </template>

      <b-skeleton width="60%"></b-skeleton>
      <b-skeleton width="100%"></b-skeleton>
      <b-skeleton width="100%"></b-skeleton>
      <b-skeleton width="85%"></b-skeleton>

      <b-skeleton class="mt-2" type="button" size="sm"></b-skeleton>
    </b-media>
  </b-card>
</template>

<script>
import { BCard, BMedia, BSkeleton, BSkeletonImg } from 'bootstrap-vue'
export default {
  name: 'BlogCard',
  components: {
    BSkeleton,
    BSkeletonImg,
    BCard,
    BMedia,
  },
}
</script>

<style lang="scss">
.skeleton__img {
  width: 64px;
  height: 64px;
}
</style>
