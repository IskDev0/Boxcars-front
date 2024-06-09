<script setup lang="ts">

import TheHeader from "@/components/common/TheHeader.vue";
import MobileMenu from "~/components/common/MobileMenu.vue";

const isMobileMenuOpen = ref<boolean>(false)

function openMobileMenu(): void {
  isMobileMenuOpen.value = true
  document.body.style.overflow = "hidden"
}

function closeMobileMenu(): void {
  isMobileMenuOpen.value = false
  document.body.style.overflow = "auto"
}
</script>

<template>
  <TheHeader @openMobileMenu="openMobileMenu"/>
  <slot/>
  <Transition name="slide-fade">
  <MobileMenu
      @close="closeMobileMenu"
      v-if="isMobileMenuOpen"/>
  </Transition>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>