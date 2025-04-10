<template>
  <NuxtLayout name="auth">
    <template #title>Welcome back</template>
    <template #subtitle>
      Don't have an account?
      <NuxtLink
        to="/auth/register"
        class="font-medium text-primary-600 hover:text-primary-500"
      >
        Sign up
      </NuxtLink>
    </template>

    <VeeForm
      :validation-schema="loginSchema"
      v-slot="{ errors }"
      @submit="handleLogin"
    >
      <div class="space-y-6">
        <UFormGroup label="Email address" name="email" :error="errors.email">
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
              placeholder="Enter your email"
            />
          </VeeField>
        </UFormGroup>

        <UFormGroup label="Password" name="password" :error="errors.password">
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
              placeholder="Enter your password"
            />
          </VeeField>
        </UFormGroup>

        <div class="flex items-center justify-between">
          <UCheckbox label="Remember me" name="remember" />
          <div class="text-sm">
            <NuxtLink
              to="/auth/forgot-password"
              class="font-medium text-primary-600 hover:text-primary-500"
            >
              Forgot your password?
            </NuxtLink>
          </div>
        </div>

        <div>
          <UButton type="submit" color="primary" block :loading="loading">
            Sign in
          </UButton>
        </div>
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
