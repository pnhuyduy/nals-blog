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
        </b-form-group>

        <div v-if="previewImage" id="preview" class="my-2">
          <img class="inline-block mr-3" :src="previewImage" width="64" height="64" />
          <b-button size="sm" variant="danger" @click="removeImage"> Xoá </b-button>
        </div>

        <b-button type="submit" variant="primary" :disabled="submitting">
          <b-spinner v-if="submitting" small></b-spinner> Tạo
        </b-button>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { BButton, BForm, BFormFile, BFormGroup, BFormInput, BFormTextarea, BSpinner } from 'bootstrap-vue'
import useBlogStore from '@/stores/blog'
import type { BlogPayload } from '@/api/blog'

export default defineComponent({
  name: 'CreateBlog',
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
  setup: (props, { root: { $bvToast, $router } }) => {
    const blogStore = useBlogStore()
    const submitting = ref(false)
    const state = reactive<BlogPayload>({
      title: '',
      content: '',
      image: null,
    })
    const previewImage = ref('')

    const onFileChange = e => {
      const file = e.target.files[0]
      previewImage.value = URL.createObjectURL(file)
    }

    const removeImage = () => {
      state.image = null
      previewImage.value = ''
    }

    const onSubmit = async () => {
      const { title, content, image } = state
      const payload = {
        title,
        content,
        image,
      }

      try {
        submitting.value = true
        await blogStore.createBlog(payload)
        $bvToast.toast(`Tạo blog ${title} thành công`, {
          title: 'Thông báo',
          variant: 'success',
          solid: true,
        })
        $router.push('/manager')
      } catch (error) {
      } finally {
        submitting.value = false
      }
    }

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
