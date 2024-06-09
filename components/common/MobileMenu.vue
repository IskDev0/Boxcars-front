<script setup lang="ts">
const emit = defineEmits<{
  close: () => void
}>()

type Link = {
  name: string
  path: string
}

const mobileLinks = ref<Link[]>([
  {
    name: "Home",
    path: "/"
  },
  {
    name: "About",
    path: "/about"
  },
  {
    name: "Contact",
    path: "/contact"
  },
  {
    name: "Sign in",
    path: "/register"
  }
])

function openLink(path: string): void {
  emit('close')
  navigateTo(path)
}
</script>

<template>
  <div
      class="fixed top-0 left-0 right-0 bg-gray-100 dark:bg-zinc-900 h-screen w-screen flex items-center justify-center">
    <ul class="flex flex-col items-center gap-4 font-bold">
      <li v-for="link in mobileLinks" :key="link.name">
        <span @click="openLink(link.path)">{{ link.name }}</span>
      </li>
    </ul>
    <Icon
        size="24"
        class="absolute top-10 right-10"
        name="lucide:x"
        @click="emit('close')"/>
  </div>
</template>