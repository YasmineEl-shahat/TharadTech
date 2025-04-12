<template>
  <NuxtLayout name="auth">
    <template #title>تسجيل الدخول</template>
    <template #subtitle>قم بإدخال بياناتك حتى تستطيع تسجيل الدخول</template>

    <VeeForm
      :validation-schema="loginSchema"
      :initial-values="loginFormValues"
      :validate-on-mount="false"
      v-slot="{ errors, isSubmitting }"
      @submit="handleLogin"
    >
      <!-- Debug the form values -->
      <div class="space-y-6">
        <!-- Email Field -->
        <UFormGroup
          name="email"
          :error="errors.email"
          class="text-gray-700 font-medium"
        >
          <label
            for="email"
            class="block mb-1 text-sm text-gray-700 font-medium"
            >البريد الإلكتروني</label
          >

          <VeeField
            name="email"
            type="email"
            autocomplete="email"
            required
            v-slot="{ field, errorMessage }"
          >
            <UInput
              size="xl"
              color="neutral"
              v-bind="field"
              :error="errorMessage"
              placeholder="Tharad@gmail.com"
              class="rounded-md w-full mb-4"
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
            for="email"
            class="block mb-1 text-sm text-gray-700 font-medium"
            >كلمة المرور</label
          >

          <VeeField
            name="password"
            type="password"
            autocomplete="current-password"
            required
            v-slot="{ field, errorMessage }"
          >
            <UInput
              size="xl"
              color="neutral"
              v-bind="field"
              :error="errorMessage"
              :type="showPassword ? 'text' : 'password'"
              placeholder="********"
              :ui="{ trailing: 'pe-1' }"
              class="rounded-md w-full"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  :aria-pressed="showPassword"
                  aria-controls="password"
                  @click="showPassword = !showPassword"
                />
              </template>
            </UInput>
          </VeeField>
        </UFormGroup>

        <!-- Remember Me and Forgot Password -->
        <div class="flex items-center justify-between mt-2">
          <UCheckbox label="تذكرني" name="remember" class="text-gray-700" />
          <div class="text-sm">
            <NuxtLink
              to="/auth/forgot-password"
              class="font-medium text-[#42867B] underline"
            >
              هل نسيت كلمة المرور؟
            </NuxtLink>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <UButton
            size="xl"
            type="submit"
            class="cursor-pointer bg-gradient-to-r from-[#5CC7A3] text-white to-[#265355] hover:opacity-90 font-bold py-2 px-4 rounded-md"
            block
            :loading="loading || isSubmitting"
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
import { ref } from "vue";

const auth = useAuthStore();
const { loading } = storeToRefs(auth);
const { loginSchema } = auth;

const showPassword = ref(false);

const loginFormValues = ref({
  email: "",
  password: "",
});

const handleLogin = async (values: any) => {
  try {
    // Validate the form values against the schema
    const validatedData = loginSchema.parse(values);

    // Only proceed if validation passes
    await auth.login(validatedData);
    navigateTo("/profile");
  } catch (error) {
    console.error("Login failed:", error);
  }
};

definePageMeta({
  layout: false,
  middleware: ["guest"],
});
</script>
