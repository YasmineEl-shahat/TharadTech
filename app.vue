<template>
  <div>
    <UApp :toaster="{ position: 'top-right', duration: 3000 }">
      <NuxtPage />
    </UApp>
  </div>
</template>

<script setup>
useHead({
  title: "TharadTech",
});
</script>
