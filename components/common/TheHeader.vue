<script setup lang="ts">

const colorMode = useColorMode()

function toggleColorMode(): void {
  if (colorMode.preference === 'light') {
    colorMode.preference = 'dark'
  } else {
    colorMode.preference = 'light'
  }
}

const emit = defineEmits<{
  "openMobileMenu": () => void
}>()

function openMobileMenu(): void {
  emit("openMobileMenu")
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-20 w-screen p-10 bg-gradient-to-b from-zinc-900 to-transparent">
    <nav class="flex items-center justify-between">
      <NuxtLink to="/">
        <NuxtImg class="h-6" src="/icons/logo.svg" alt="logo"/>
      </NuxtLink>
      <ul class="hidden md:flex items-center gap-5 font-medium text-white">
        <li>
          <NuxtLink to="/blogs">Blog</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact">Contact</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/register">Sign in</NuxtLink>
        </li>
        <li>
          <button @click="toggleColorMode">
            <Icon
                class="text-white"
                size="24"
                :name="colorMode.preference == 'dark'  ? 'lucide:moon' : 'lucide:sun'"/>
          </button>
        </li>
      </ul>
      <div class="md:hidden flex items-center gap-4">
        <button @click="toggleColorMode">
          <Icon
              class="text-white"
              size="24"
              :name="colorMode.preference == 'dark'  ? 'lucide:moon' : 'lucide:sun'"/>
        </button>
        <button @click="openMobileMenu">
          <Icon
              class="text-white"
              size="24"
              name="lucide:menu"/>
        </button>
      </div>
    </nav>
  </header>
</template>