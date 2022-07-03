<template>
  <b-card class="flex flex-col cursor-pointer blog__card" @click="onClickBlogCard">
    <b-card-text>
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
          {{ content | truncate(10) }}
        </div>
      </b-media>
    </b-card-text>
    <template #footer>
      <span class="text-success float-right">{{ createdAt | readableDate() }}</span>
    </template>
  </b-card>
</template>

<script>
import { BCard, BCardText, BImgLazy, BLink, BMedia } from 'bootstrap-vue'
import dayjs from '@/libs/day'
export default defineComponent({
  name: 'BlogCard',
  components: {
    BCard,
    BMedia,
    BImgLazy,
    BLink,
    BCardText
  },
  filters: {
    truncate(string, value) {
      return `${string.split(' ').splice(0, value).join(' ')}...`
    },
    readableDate(value) {
      return dayjs(value).format('DD/MM/YYYY HH:MM')
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
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
    createdAt: {
      type: String,
    },
  },
  setup(props, { root: { $router } }) {
    const onClickBlogCard = () => {
      $router.push({
        name: 'main.blog',
        params: {
          id: props.id,
        },
      })
    }

    return {
      onClickBlogCard
    }
  },
})
</script>

<style lang="scss" scoped>

.blog__card {
  height: 200px;
}
.blog__title {
  color: black;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #0098d1;
  }
}
</style>
