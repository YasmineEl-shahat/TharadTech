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

    <!-- Backdrop Filter -->
    <div class="absolute inset-0 bg-[#42867BB2]"></div>

    <!-- Card Content -->
    <div
      class="relative w-full max-w-xl bg-white rounded-3xl shadow-lg overflow-hidden"
    >
      <div class="p-6 sm:p-10 py-15 lg:px-20">
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
