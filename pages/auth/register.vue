<template>
  <NuxtLayout name="auth">
    <template #title>إنشاء حساب جديد</template>
    <template #subtitle>قم بإدخال بياناتك حتى تستطيع إنشاء حساب جديد</template>

    <VeeForm
      :validation-schema="validationSchema"
      :initial-values="registerFormValues"
      @submit="handleRegister"
      v-slot="{ errors }"
    >
      <div class="space-y-4 flex flex-col">
        <!-- Profile Picture Upload -->
        <label
          for="profile_picture"
          class="block mb-1 text-sm text-gray-700 font-medium"
        >
          الصورة الشخصية
        </label>
        <div
          class="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center cursor-pointer"
          @click="triggerFileInput"
        >
          <div class="text-gray-500 text-sm flex flex-col items-center">
            <img src="/images/camera.svg" alt="camera" class="mb-1" />
            <p>JPEG , PNG : الملفات المسموح بها</p>
            <p>5MB الحد الأقصى</p>
          </div>
        </div>
        <input
          id="profile_picture"
          type="file"
          accept="image/jpeg, image/png"
          class="hidden"
          @change="handleFileUpload"
        />

        <!-- Image Preview -->
        <div v-if="selectedFile" class="mt-4 relative w-fit mx-auto">
          <img
            :src="imagePreviewUrl"
            alt="Preview"
            class="w-24 h-24 object-cover rounded-full border border-gray-300"
          />
          <button
            type="button"
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            @click="removeImage"
          >
            ×
          </button>
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
          <VeeErrorMessage name="name" class="text-red-500 text-sm mt-1" />
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
          <VeeErrorMessage name="email" class="text-red-500 text-sm mt-1" />
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
              :type="showPassword ? 'text' : 'password'"
              placeholder="********"
              size="xl"
              color="neutral"
              :ui="{ trailing: 'pe-1' }"
              class="bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 w-full"
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
          <VeeErrorMessage name="password" class="text-red-500 text-sm mt-1" />
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
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="********"
              size="xl"
              color="neutral"
              :ui="{ trailing: 'pe-1' }"
              class="bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 w-full"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="
                    showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'
                  "
                  :aria-label="
                    showConfirmPassword ? 'Hide password' : 'Show password'
                  "
                  :aria-pressed="showConfirmPassword"
                  aria-controls="password_confirmation"
                  @click="showConfirmPassword = !showConfirmPassword"
                />
              </template>
            </UInput>
          </VeeField>
          <VeeErrorMessage
            name="password_confirmation"
            class="text-red-500 text-sm mt-1"
          />
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
import { ref } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { registerSchema } from "../../stores/auth.schemas";

const auth = useAuthStore();
const { loading } = storeToRefs(auth);

const validationSchema = toTypedSchema(registerSchema);

const selectedFile = ref<File | null>(null);
const imagePreviewUrl = ref<string | undefined>(undefined);

const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Initialize default values for the form
const registerFormValues = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  image: null,
});

const handleRegister = async (values: any) => {
  try {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);
    if (selectedFile.value) {
      formData.append("image", selectedFile.value);
    }

    await auth.register(formData);
    navigateTo(`/auth/verify-otp?email=${values.email}`);
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

const triggerFileInput = () => {
  const fileInput = document.getElementById(
    "profile_picture"
  ) as HTMLInputElement;
  if (fileInput) {
    fileInput.click();
  }
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  if (file) {
    selectedFile.value = file;
    imagePreviewUrl.value = URL.createObjectURL(file); // <-- preview
  }
};
const removeImage = () => {
  selectedFile.value = null;
  imagePreviewUrl.value = undefined;
};

definePageMeta({
  layout: false,
  middleware: ["guest"],
});
</script>
