<template>
  <NuxtLayout name="auth">
    <template #title>رمز التحقق</template>
    <template #subtitle>
      لاستكمال فتح حسابك ادخل رمز التحقق المرسل عبر البريد الإلكتروني
    </template>

    <VeeForm
      :validation-schema="otpSchema"
      :initial-values="otpFormValues"
      @submit="handleVerifyOtp"
      v-slot="{ errors }"
    >
      <div class="space-y-6">
        <!-- OTP Input Field -->
        <div>
          <UFormGroup name="otp">
            <VeeField name="otp" v-slot="{ field, errorMessage }">
              <UPinInput
                v-bind="field"
                :error="errorMessage"
                otp
                length="6"
                placeholder="•"
                size="xl"
                class="text-center tracking-widest text-lg w-full"
              />
            </VeeField>
          </UFormGroup>
        </div>

        <!-- Resend OTP and Timer -->
        <div class="flex justify-between items-center text-sm text-gray-600">
          <p>{{ timer }} Sec</p>

          <div class="flex items-center">
            <p>لم يصلك رمز؟</p>
            <UButton
              variant="link"
              :loading="resendLoading"
              @click="handleResendOtp"
              class="text-[#265355] hover:text-[#265355] p-0 underline cursor-pointer"
            >
              إعادة إرسال
            </UButton>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <UButton
            type="submit"
            block
            class="cursor-pointer bg-gradient-to-r from-[#5CC7A3] to-[#265355] hover:opacity-90 text-white font-bold py-2 px-4 rounded-md w-full"
            :loading="loading"
          >
            المتابعة
          </UButton>
        </div>
      </div>
    </VeeForm>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useApi } from "../../composables/useApi";

const auth = useAuthStore();
const { loading, otpSchema } = storeToRefs(auth);
const resendLoading = ref(false);
const timer = ref(59);

// Initialize default values for the form
const otpFormValues = ref({
  otp: "",
});

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
    timer.value = 59; // Reset timer after resending OTP
  } catch (error) {
    console.error("Resend OTP failed:", error);
  } finally {
    resendLoading.value = false;
  }
};

// Countdown Timer
const startTimer = () => {
  const interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value -= 1;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

onMounted(() => {
  startTimer();
});

definePageMeta({
  layout: false,
  middleware: ["guest"],
});
</script>
