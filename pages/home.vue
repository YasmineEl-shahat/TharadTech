<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 text-center">
      <h1 class="text-2xl font-bold mb-4 text-primary-700">
        مرحباً {{ user?.name }}!
      </h1>

     

      <div class="flex justify-center gap-4">
        <UButton
          to="/profile"
          variant="solid"
          class="bg-[#5CC7A3] hover:bg-[#4db494] text-white font-medium px-4 py-2 rounded"
        >
          الملف الشخصي
        </UButton>

        <UButton
          @click="handleLogout"
          variant="outline"
          class="border-red-500 text-red-600 hover:bg-red-100 font-medium px-4 py-2 rounded"
        >
          تسجيل الخروج
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const auth = useAuthStore();
const { user } = storeToRefs(auth);

const handleLogout = () => {
  auth.logout();
  navigateTo("/auth/login");
};

definePageMeta({
  middleware: ["auth"],
});
</script>