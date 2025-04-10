<template>
  <NuxtLayout name="auth">
    <template #title>إنشاء حساب جديد</template>
    <template #subtitle>قم بإدخال بياناتك حتى تستطيع إنشاء حساب جديد</template>

    <VeeForm
      :validation-schema="registerSchema"
      @submit="handleRegister"
      v-slot="{ errors }"
    >
      <div class="space-y-4 flex flex-col">
        <!-- Profile Picture Upload -->
        <label for="name" class="block mb-1 text-sm text-gray-700 font-medium">
          الصورة الشخصية
        </label>
        <div
          class="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center"
        >
          <div class="text-gray-500 text-sm">
            <i class="i-lucide-camera text-2xl mb-2"></i>
            <p>JPEG , PNG : الملفات المسموح بها</p>
            <p>5MB الحد الأقصى</p>
          </div>
        </div>

        <!-- Full Name Field -->
        <UFormGroup
          name="name"
          :error="errors.name"
          class="text-gray-700 font-medium"
        >
          <label
            for="name"
            class="block mb-1 text-sm text-gray-700 font-medium"
          >
            اسم المستخدم
          </label>
          <VeeField name="name" v-slot="{ field, errorMessage }">
            <UInput
              v-bind="field"
              :error="errorMessage"
              placeholder="thar22"
              size="xl"
              color="neutral"
              class="bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 w-full"
            />
          </VeeField>
        </UFormGroup>

        <!-- Email Field -->
        <UFormGroup
          name="email"
          :error="errors.email"
          class="text-gray-700 font-medium"
        >
          <label
            for="email"
            class="block mb-1 text-sm text-gray-700 font-medium"
          >
            البريد الإلكتروني
          </label>
          <VeeField name="email" v-slot="{ field, errorMessage }">
            <UInput
              v-bind="field"
              :error="errorMessage"
              placeholder="Tharad@gmail.com"
              type="email"
              size="xl"
              color="neutral"
              class="bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 w-full"
            />
          </VeeField>
        </UFormGroup>

        <!-- Password Field -->
        <UFormGroup
          name="password"
          :error="errors.password"
          class="text-gray-700 font-medium"
        >
          <label
            for="password"
            class="block mb-1 text-sm text-gray-700 font-medium"
          >
            كلمة المرور
          </label>
          <VeeField name="password" v-slot="{ field, errorMessage }">
            <UInput
              v-bind="field"
              :error="errorMessage"
              placeholder="********"
              type="password"
              size="xl"
              color="neutral"
              class="bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 w-full"
            />
          </VeeField>
        </UFormGroup>

        <!-- Confirm Password Field -->
        <UFormGroup
          name="password_confirmation"
          :error="errors.password_confirmation"
          class="text-gray-700 font-medium"
        >
          <label
            for="password_confirmation"
            class="block mb-1 text-sm text-gray-700 font-medium"
          >
            تأكيد كلمة المرور
          </label>
          <VeeField
            name="password_confirmation"
            v-slot="{ field, errorMessage }"
          >
            <UInput
              v-bind="field"
              :error="errorMessage"
              placeholder="********"
              type="password"
              size="xl"
              color="neutral"
              class="bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 w-full"
            />
          </VeeField>
        </UFormGroup>

        <!-- Submit Button -->
        <div>
          <UButton
            type="submit"
            block
            size="xl"
            class="bg-gradient-to-r from-[#5CC7A3] to-[#265355] hover:opacity-90 text-white font-bold py-2 px-4 rounded-md w-full"
            :loading="loading"
          >
            إنشاء حساب جديد
          </UButton>
        </div>

        <!-- Login Link -->
        <p class="mt-4 text-center text-sm text-gray-600">
          لديك حساب؟
          <NuxtLink
            to="/auth/login"
            class="font-medium text-green-600 hover:text-green-500"
          >
            تسجيل الدخول
          </NuxtLink>
        </p>
      </div>
    </VeeForm>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";

const auth = useAuthStore();
const { loading, registerSchema } = storeToRefs(auth);

const handleRegister = async (values: any) => {
  try {
    await auth.register(values);
    navigateTo("/auth/verify-otp");
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

definePageMeta({
  layout: false,
  middleware: ["guest"],
});
</script>
