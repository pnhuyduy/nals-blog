<template>
  <div class="flex flex-col gap-5">
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <b-form @submit.prevent="handleSubmit(onSubmit)">
        <ValidationProvider v-slot="{ errors }" mode="lazy" name="Tiêu đề" rules="required">
          <b-form-group label="Tiêu đề" label-for="title">
            <b-form-input id="title" v-model="state.title" type="text" placeholder="nhập tiêu đề..." autofocus />
          </b-form-group>
          <small class="text-danger">{{ errors[0] }}</small>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" mode="lazy" name="Nội dung" rules="required">
          <b-form-group id="input-group-2" label="Nội dung" label-for="input-2" required>
            <b-form-textarea
              id="textarea"
              v-model="state.content"
              placeholder="Nội dung..."
              no-resize
              rows="15"
              max-rows="10"
            ></b-form-textarea>
          </b-form-group>
          <small class="text-danger">{{ errors[0] }}</small>
        </ValidationProvider>

        <b-form-group label="Hình ảnh" label-for="image">
          <b-form-file
            id="image"
            v-model="state.image"
            placeholder="Chọn hình ảnh..."
            drop-placeholder="Thả hình vào đây..."
            @change="onFileChange"
          />
          <div v-if="previewImage" id="preview" class="my-2">
            <img class="inline-block mr-3" :src="previewImage" width="64" height="64" />
            <b-button size="sm" variant="danger" @click="removeImage"> Xoá </b-button>
          </div>
        </b-form-group>

        <b-button class="mr-2" type="submit" variant="success" :disabled="submitting">
          <b-spinner v-if="submitting" small></b-spinner>
          Cập nhật
        </b-button>

        <b-button variant="secondary" :disabled="submitting" @click="$router.push('/manager')"> Quay lại </b-button>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { BButton, BForm, BFormFile, BFormGroup, BFormInput, BFormTextarea, BSpinner } from 'bootstrap-vue'
import useBlogStore from '@/stores/blog'
import { useBlogEditor } from '@/composables/useBlog'
export default defineComponent({
  name: 'EditBlog',
  components: {
    ValidationObserver,
    ValidationProvider,
    BForm,
    BFormFile,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BButton,
    BSpinner,
  },
  setup: (props, { root: { $bvToast, $route, $router } }) => {
    const blogStore = useBlogStore()
    const { submitting, state, previewImage, getBlogById, removeImage, onFileChange } = useBlogEditor()

    const onSubmit = async () => {
      const { id, title, content, image } = state
      const payload = {
        title,
        content,
        image,
      }

      try {
        submitting.value = true
        await blogStore.updateBlog(id, payload)
        $bvToast.toast(`Tạo blog ${title} thành công`, {
          title: 'Thông báo',
          variant: 'success',
          solid: true,
        })
        $router.push('/manager')
      } catch (error) {
        $bvToast.toast(`Update blog ${title} thành công`, {
          title: 'Thông báo',
          variant: 'danger',
          solid: true,
        })
      } finally {
        submitting.value = false
      }
    }

    onMounted(async () => {
      const { id } = $route.params

      if (id) await getBlogById(id)
      else $router.push('/manager')
    })

    return {
      submitting,
      state,
      previewImage,
      removeImage,
      onFileChange,
      onSubmit,
    }
  },
})
</script>

<style lang="scss" scoped></style>
