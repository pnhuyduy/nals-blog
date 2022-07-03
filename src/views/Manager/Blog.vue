<template>
  <div class="flex flex-col gap-5">
    <div class="flex">
      <b-button variant="primary" @click="$router.push('/manager/new')"> Tạo mới </b-button>
    </div>
    <BlogSortAndSearch @search="onSearch" />
    <b-overlay :show="isLoading" rounded="sm">
      <b-table responsive bordered striped :fields="fields" :items="blogs">
        <template #cell(image)="data">
          <b-img thumbnail :src="data.item.image.url" :alt="data.item.title" height="64" width="64"></b-img>
        </template>

        <template #cell(actions)="data">
          <div class="flex flex-row gap-3">
            <b-button variant="info" size="sm" @click="editBlog(data.item.id)">
              <MdiPencil />
            </b-button>
            <b-button variant="outline-danger" size="sm" @click="showDeleteBlogConfirm(data.item)">
              <MdiDelete />
            </b-button>
          </div>
        </template>
      </b-table>
    </b-overlay>
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
import { BButton, BImg, BOverlay, BPagination, BTable } from 'bootstrap-vue'
import BlogSortAndSearch from '@/views/Blog/BlogSortAndSearch.vue'
import dayjs from '@/libs/day'
import useBlog from '@/composables/useBlog'
import type { Blog } from '@/types'

export default defineComponent({
  name: 'BlogManager',
  components: {
    BButton,
    BTable,
    BPagination,
    BlogSortAndSearch,
    BOverlay,
    BImg,
  },
  setup(props, { root: { $bvModal, $router } }) {
    const fields = [
      'id',
      {
        key: 'title',
        label: 'Tiêu đề',
      },
      {
        key: 'image',
        label: 'Hình ảnh',
      },
      {
        key: 'created_at',
        label: 'T.Gian tạo',
        formatter: (value: string) => {
          return dayjs(value).format('DD/MM/YYYY HH:MM')
        },
      },
      {
        key: 'updated_at',
        label: 'T.Gian cập nhật',
        formatter: (value: string) => {
          return dayjs(value).format('DD/MM/YYYY HH:MM')
        },
      },
      'actions',
    ]
    const { blogs, pagination, isLoading, onSearch, deleteBlog } = useBlog()

    const editBlog = (id: number) => {
      $router.push({
        name: 'manager.blog.edit',
        params: {
          id,
        },
      })
    }

    const showDeleteBlogConfirm = (blog: Blog) => {
      const { title, id } = blog
      $bvModal
        .msgBoxConfirm(`Bạn muốn xoá blog ${title}?`, {
          title: 'Xác nhận',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Có',
          cancelTitle: 'Không',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
        })
        .then(async (value: boolean) => {
          if (value) await deleteBlog(id)
        })
    }

    return {
      fields,
      isLoading,
      blogs,
      pagination,

      onSearch,
      editBlog,
      showDeleteBlogConfirm,
    }
  },
})
</script>

<style lang="scss" scoped></style>
