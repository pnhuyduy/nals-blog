<template>
  <b-card class="flex flex-col cursor-pointer">
    <b-media>
      <template #aside>
        <div class="flex flex-col">
          <b-img-lazy blank-color="#ccc" width="64" alt="placeholder" :src="image">
            </b-img>
            <div v-if="commentsCount" class="text-muted">
              <mdiMessageOutline class="mr-1" /><span>{{ commentsCount }}</span>
            </div>
          </b-img-lazy>
        </div>
      </template>

      <b-link class="blog__title mt-0 h4">
        {{ title }}
      </b-link>
      <div class="text-muted">
        {{ content | truncate(30) }}
      </div>

      <b-button class="mt-2" variant="primary" size="sm">
        Đọc thêm
      </b-button>
    </b-media>
  </b-card>
</template>

<script>
import { BButton, BCard, BImgLazy, BLink, BMedia } from 'bootstrap-vue'
export default {
  name: 'BlogCard',
  components: {
    BCard,
    BMedia,
    BImgLazy,
    BButton,
    BLink,
  },
  filters: {
    truncate(string, value) {
      return `${string.split(' ').splice(0, value).join(' ')}...`
    },
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    commentsCount: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.blog__title {
  color: black;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #0098d1;
  }
}
</style>
