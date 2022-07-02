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
        <a
          aria-label="Github"
          href="https://github.com/lstoeferle/vite-vue2-windicss-starter"
          target="_blank"
          class="flex items-center justify-center mr-2 text-black w-9 h-9 dark:text-white"
        >
          <MdiGithub />
        </a>
        <button
          class="flex items-center justify-center w-9 h-9 focus:outline-none"
          aria-label="dark-mode"
          @click="toggle()"
        >
          <MdiWhiteBalanceSunny v-if="isDark" class="text-yellow-500" />
          <MdiMoonWaningCrescent v-else class="text-gray-800" />
        </button>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import routes from '@/router/routes'
export default defineComponent({
  setup: () => {
    // Import config from .env
    const appName = import.meta.env.VITE_APP_NAME

    const availableRoutes = routes.filter(route => route.name !== 'NotFound')
    const currentRoute = computed(() => getCurrentInstance()?.proxy?.$route)

    const isDark = useDark()
    const toggle = useToggle(isDark)

    return {
      appName,
      availableRoutes,
      currentRoute,

      // Darkmode
      isDark,
      toggle,
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
