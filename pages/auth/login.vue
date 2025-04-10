<template>
  <NuxtLayout name="auth">
    <template #title>تسجيل الدخول</template>
    <template #subtitle>قم بإدخال بياناتك حتى تستطيع تسجيل الدخول</template>

    <VeeForm
      :validation-schema="loginSchema"
      v-slot="{ errors }"
      @submit="handleLogin"
    >
      <div class="space-y-6">
        <!-- Email Field -->
        <UFormGroup
          label="البريد الإلكتروني"
          name="email"
          :error="errors.email"
          class="text-gray-700 font-medium"
        >
          <VeeField
            name="email"
            type="email"
            autocomplete="email"
            required
            v-slot="{ field, errorMessage }"
          >
            <UInput
              v-bind="field"
              :error="errorMessage"
              placeholder="Tharad@gmail.com"
              class="bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 w-full"
            />
          </VeeField>
        </UFormGroup>

        <!-- Password Field -->
        <UFormGroup
          label="كلمة المرور"
          name="password"
          :error="errors.password"
          class="text-gray-700 font-medium"
        >
          <VeeField
            name="password"
            type="password"
            autocomplete="current-password"
            required
            v-slot="{ field, errorMessage }"
          >
            <UInput
              v-bind="field"
              :error="errorMessage"
              type="password"
              placeholder="********"
              class="bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 w-full"
            />
          </VeeField>
        </UFormGroup>

        <!-- Remember Me and Forgot Password -->
        <div class="flex items-center justify-between">
          <UCheckbox label="تذكرني" name="remember" class="text-gray-700" />
          <div class="text-sm">
            <NuxtLink
              to="/auth/forgot-password"
              class="font-medium text-green-600 hover:text-green-500"
            >
              هل نسيت كلمة المرور؟
            </NuxtLink>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <UButton
            type="submit"
            class="bg-gradient-to-r from-[#5CC7A3] text-white to-[#265355] hover:opacity-90 font-bold py-2 px-4 rounded-md"
            block
            :loading="loading"
          >
            تسجيل الدخول
          </UButton>
        </div>

        <!-- Register Link -->
        <p class="mt-4 text-center text-sm text-gray-600">
          ليس لديك حساب؟
          <NuxtLink
            to="/auth/register"
            class="font-medium text-green-600 hover:text-green-500"
          >
            إنشاء حساب جديد
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
const { loading } = storeToRefs(auth);
const { loginSchema } = auth; // Access non-reactive property directly

const handleLogin = async (values: any) => {
  try {
    await auth.login(values);
    navigateTo("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);
  }
};

definePageMeta({
  layout: false,
  middleware: ["guest"],
});
</script>
