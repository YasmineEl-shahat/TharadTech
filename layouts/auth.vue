<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
    dir="rtl"
  >
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/images/authbg.jpeg')"
    ></div>

    <!-- Background Filter -->
    <div class="absolute inset-0 bg-[#42867BB2]"></div>

    <!-- Card Content -->
    <div
      class="relative w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div class="p-6 sm:p-10">
        <div class="text-center">
          <img
            class="mx-auto h-16 w-auto"
            src="/images/logo.svg"
            alt="TharadTech"
          />
          <h2 class="mt-6 text-2xl font-extrabold text-gray-900">
            <slot name="title">تسجيل الدخول</slot>
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            <slot name="subtitle"
              >قم بإدخال بياناتك حتى تستطيع تسجيل الدخول</slot
            >
          </p>
        </div>
        <div class="mt-8">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Auth layout for login, register, and OTP verification pages
</script>

<style scoped>
/* Ensure the background image covers the entire screen */
.bg-cover {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

/* Card shadow and rounded corners */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
