<template>
  <NuxtLayout name="auth">
    <template #title>Create your account</template>
    <template #subtitle>
      Already have an account?
      <NuxtLink
        to="/auth/login"
        class="font-medium text-primary-600 hover:text-primary-500"
      >
        Sign in
      </NuxtLink>
    </template>

    <VeeForm
      :validation-schema="registerSchema"
      @submit="handleRegister"
      v-slot="{ errors }"
    >
      <div class="space-y-6">
        <div>
          <UFormGroup label="Full name" name="name">
            <VeeField name="name" v-slot="{ field, errors }">
              <UInput
                v-bind="field"
                :error="errors[0]"
                placeholder="Enter your full name"
              />
            </VeeField>
          </UFormGroup>
        </div>

        <div>
          <UFormGroup label="Email address" name="email">
            <VeeField name="email" v-slot="{ field, errors }">
              <UInput
                v-bind="field"
                :error="errors[0]"
                placeholder="Enter your email"
                type="email"
              />
            </VeeField>
          </UFormGroup>
        </div>

        <div>
          <UFormGroup label="Phone number" name="phone">
            <VeeField name="phone" v-slot="{ field, errors }">
              <UInput
                v-bind="field"
                :error="errors[0]"
                placeholder="Enter your phone number"
                type="tel"
              />
            </VeeField>
          </UFormGroup>
        </div>

        <div>
          <UFormGroup label="Password" name="password">
            <VeeField name="password" v-slot="{ field, errors }">
              <UInput
                v-bind="field"
                :error="errors[0]"
                placeholder="Enter your password"
                type="password"
              />
            </VeeField>
          </UFormGroup>
        </div>

        <div>
          <UFormGroup label="Confirm password" name="password_confirmation">
            <VeeField name="password_confirmation" v-slot="{ field, errors }">
              <UInput
                v-bind="field"
                :error="errors[0]"
                placeholder="Confirm your password"
                type="password"
              />
            </VeeField>
          </UFormGroup>
        </div>

        <div>
          <UButton type="submit" color="primary" block :loading="loading">
            Create account
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
