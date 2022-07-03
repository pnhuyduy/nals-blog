<template>
  <header class="bg-gray-200 text-gray-600 body-font dark:bg-gray-800">
    <div class="container flex flex-col flex-wrap items-center py-3 mx-auto md:flex-row">
      <RouterLink
        id="navbarHome"
        :to="{ name: 'main.home' }"
        class="flex items-center font-medium text-gray-900 title-font md:mb-0"
      >
        <img alt="Vite logo" src="@/assets/vite-logo.svg" width="36px" />
        <span class="ml-3 text-xl dark:text-white decoration-none">
          {{ appName }}
        </span>
      </RouterLink>

      <nav class="flex flex-wrap items-center justify-center text-base md:ml-auto">
        <b-button variant="primary" size="sm" @click="$router.push({ name: 'manager.blog' }).catch(() => {})">
          Create Blog
        </b-button>
        <a
          aria-label="Github"
          href="https://github.com/pnhuyduy/nals-blog"
          target="_blank"
          class="flex items-center justify-center mr-2 text-black w-9 h-9 dark:text-white"
        >
          <MdiGithub />
        </a>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { BButton } from 'bootstrap-vue'
import routes from '@/router/routes'
export default defineComponent({
  components: {
    BButton,
  },
  setup: () => {
    // Import config from .env
    const appName = import.meta.env.VITE_APP_NAME

    const availableRoutes = routes.filter(route => route.name !== 'NotFound')
    const currentRoute = computed(() => getCurrentInstance()?.proxy?.$route)

    return {
      appName,
      availableRoutes,
      currentRoute,
    }
  },
})
</script>

<style lang="scss">
#navbarHome {
  text-decoration: none;
  &:hover {
    color: #0098d1;
  }
}
</style>
