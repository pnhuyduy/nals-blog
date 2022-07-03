<template>
  <section class="text-gray-600 body-font">
    <div class="container flex flex-col items-center justify-center px-5 py-5 mx-auto">
      <img
        class="object-cover object-center w-5/6 mb-10 rounded lg:w-2/6 md:w-3/6"
        alt="hero"
        src="@/assets/not-found.svg"
      />
      <div class="w-full text-center lg:w-2/3">
        <h1 class="text-red-500 dark:text-red-500">404</h1>
        <p class="mb-8 leading-relaxed dark:text-gray-300">Trang bạn tìm kiếm không tồn tại.</p>
        <div class="flex justify-center">
          <RouterLink :to="{ name: 'main.home' }">
            <b-button variant="success"> Về trang chủ </b-button>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { BButton } from 'bootstrap-vue'
export default defineComponent({
  components: {
    BButton,
  },
})
</script>
