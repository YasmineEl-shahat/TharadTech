<template>
  <NuxtLayout name="auth">
    <template #title>Verify your account</template>
    <template #subtitle>
      Please enter the 6-digit code sent to your email
    </template>

    <VeeForm
      :validation-schema="otpSchema"
      @submit="handleVerifyOtp"
      v-slot="{ errors }"
    >
      <div class="space-y-6">
        <div>
          <UFormGroup label="OTP Code" name="otp">
            <VeeField name="otp" v-slot="{ field, errors }">
              <UInput
                v-bind="field"
                :error="errors[0]"
                placeholder="Enter 6-digit code"
                type="text"
                maxlength="6"
                class="text-center tracking-widest text-lg"
              />
            </VeeField>
          </UFormGroup>
        </div>

        <div>
          <UButton type="submit" color="primary" block :loading="loading">
            Verify Account
          </UButton>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Didn't receive the code?
            <UButton
              variant="link"
              color="primary"
              :loading="resendLoading"
              @click="handleResendOtp"
            >
              Resend OTP
            </UButton>
          </p>
        </div>
      </div>
    </VeeForm>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";
import { useApi } from "../../composables/useApi";

const auth = useAuthStore();
const { loading, otpSchema } = storeToRefs(auth);
const resendLoading = ref(false);

const handleVerifyOtp = async (values: any) => {
  try {
    await auth.verifyOtp(values);
    navigateTo("/dashboard");
  } catch (error) {
    console.error("OTP verification failed:", error);
  }
};

const handleResendOtp = async () => {
  resendLoading.value = true;
  const { apiFetch } = useApi();
  try {
    await apiFetch("/auth/resend-otp", {
      method: "POST",
    });
  } catch (error) {
    console.error("Resend OTP failed:", error);
  } finally {
    resendLoading.value = false;
  }
};

definePageMeta({
  layout: false,
  middleware: ["guest"],
});
</script>
