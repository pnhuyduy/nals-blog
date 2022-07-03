<template>
  <div>
    <NavBar />
    <main class="py-10">
      <section class="container mx-auto">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import NavBar from './components/Navbar.vue'

export default defineComponent({
  components: {
    NavBar,
  },
})
</script>
