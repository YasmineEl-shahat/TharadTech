<template>
  <div
    style="background-image: url('/images/authbg.jpeg')"
    class="py-10 mb-10 relative"
  >
    <!-- Backdrop Filter -->
    <div class="absolute inset-0 bg-[#42867BB2]"></div>
    <h1 class="text-2xl font-bold text-center mb-6 relative">الملف الشخصي</h1>
  </div>
  <div class="max-w-2xl mx-auto mb-10" dir="rtl">
    <VeeForm
      :validation-schema="validationSchema"
      :initial-values="profileFormValues"
      v-slot="{ errors }"
      @submit="handleUpdateProfile"
    >
      <div
        class="bg-white shadow-md rounded-lg p-6 sm:p-10 py-15 lg:px-20 flex flex-col space-y-6"
      >
        <!-- Full Name Field -->
        <UFormGroup name="name" :error="errors.name">
          <label
            for="name"
            class="block mb-1 text-sm text-gray-700 font-medium"
          >
            اسم المستخدم
          </label>
          <VeeField
            name="name"
            :value="user?.name"
            v-slot="{ field, errorMessage }"
          >
            <UInput
              id="name"
              v-bind="field"
              :error="errorMessage"
              placeholder="thar22"
              class="bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 w-full"
            />
          </VeeField>
          <VeeErrorMessage name="name" class="text-red-500 text-sm mt-1" />
        </UFormGroup>

        <!-- Email Field -->
        <UFormGroup name="email" :error="errors.email">
          <label
            for="email"
            class="block mb-1 text-sm text-gray-700 font-medium"
          >
            البريد الإلكتروني
          </label>
          <VeeField
            name="email"
            :value="user?.email"
            v-slot="{ field, errorMessage }"
          >
            <UInput
              id="email"
              v-bind="field"
              :error="errorMessage"
              placeholder="Tharad@gmail.com"
              type="email"
              disabled
              class="bg-gray-100 text-gray-900 border border-gray-300 rounded-md w-full"
            />
          </VeeField>
          <VeeErrorMessage name="email" class="text-red-500 text-sm mt-1" />
        </UFormGroup>

        <!-- Profile Picture Upload -->
        <UFormGroup name="image" :error="errors.image">
          <label
            for="image"
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
            id="image"
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
          <VeeErrorMessage name="image" class="text-red-500 text-sm mt-1" />
        </UFormGroup>

        <!-- Old Password Field -->
        <UFormGroup name="old_password" :error="errors.old_password">
          <label
            for="old_password"
            class="block mb-1 text-sm text-gray-700 font-medium"
          >
            كلمة المرور القديمة
          </label>
          <VeeField name="old_password" v-slot="{ field, errorMessage }">
            <UInput
              v-bind="field"
              :error="errorMessage"
              :type="showOldPassword ? 'text' : 'password'"
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
                  :icon="showOldPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="
                    showOldPassword ? 'Hide password' : 'Show password'
                  "
                  :aria-pressed="showOldPassword"
                  aria-controls="old_password"
                  @click="showOldPassword = !showOldPassword"
                />
              </template>
            </UInput>
          </VeeField>
          <VeeErrorMessage
            name="old_password"
            class="text-red-500 text-sm mt-1"
          />
        </UFormGroup>

        <!-- New Password Field -->
        <UFormGroup name="new_password" :error="errors.new_password">
          <label
            for="new_password"
            class="block mb-1 text-sm text-gray-700 font-medium"
          >
            كلمة المرور الجديدة
          </label>
          <VeeField name="new_password" v-slot="{ field, errorMessage }">
            <UInput
              v-bind="field"
              :error="errorMessage"
              :type="showNewPassword ? 'text' : 'password'"
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
                  :icon="showNewPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="
                    showNewPassword ? 'Hide password' : 'Show password'
                  "
                  :aria-pressed="showNewPassword"
                  aria-controls="new_password"
                  @click="showNewPassword = !showNewPassword"
                />
              </template>
            </UInput>
          </VeeField>
          <VeeErrorMessage
            name="new_password"
            class="text-red-500 text-sm mt-1"
          />
        </UFormGroup>

        <!-- Confirm New Password Field -->
        <UFormGroup
          name="confirm_new_password"
          :error="errors.confirm_new_password"
        >
          <label
            for="confirm_new_password"
            class="block mb-1 text-sm text-gray-700 font-medium"
          >
            تأكيد كلمة المرور الجديدة
          </label>
          <VeeField
            name="confirm_new_password"
            v-slot="{ field, errorMessage }"
          >
            <UInput
              v-bind="field"
              :error="errorMessage"
              :type="showConfirmNewPassword ? 'text' : 'password'"
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
                    showConfirmNewPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'
                  "
                  :aria-label="
                    showConfirmNewPassword ? 'Hide password' : 'Show password'
                  "
                  :aria-pressed="showConfirmNewPassword"
                  aria-controls="confirm_new_password"
                  @click="showConfirmNewPassword = !showConfirmNewPassword"
                />
              </template>
            </UInput>
          </VeeField>
          <VeeErrorMessage
            name="confirm_new_password"
            class="text-red-500 text-sm mt-1"
          />
        </UFormGroup>

        <!-- Save Changes Button -->
        <div class="flex justify-between items-center">
          <UButton
            type="submit"
            block
            class="cursor-pointer bg-gradient-to-r from-[#5CC7A3] to-[#265355] hover:opacity-90 text-white font-bold py-2 px-4 rounded-md w-full"
            :loading="loading"
          >
            حفظ التغييرات
          </UButton>
        </div>

        <!-- Logout Button -->
        <div class="text-center mt-4">
          <UButton
            variant="link"
            class="text-red-600 hover:text-red-500 font-medium"
            @click="handleLogout"
          >
            تسجيل الخروج
          </UButton>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { profileSchema } from "../stores/auth.schemas";

const auth = useAuthStore();
const { user, loading } = storeToRefs(auth);

const validationSchema = toTypedSchema(profileSchema);

const selectedFile = ref<File | null>(null);
const imagePreviewUrl = ref<string | undefined>(undefined);

const showOldPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmNewPassword = ref(false);

// Initialize default values for the form
const profileFormValues = ref({
  name: user.value?.name || "",
  email: user.value?.email || "",
  old_password: "",
  new_password: "",
  confirm_new_password: "",
  image: null,
});

const handleUpdateProfile = async (values: any) => {
  try {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("old_password", values.old_password || "");
    formData.append("new_password", values.new_password || "");
    formData.append("confirm_new_password", values.confirm_new_password || "");
    if (selectedFile.value) {
      formData.append("image", selectedFile.value);
    }

    await auth.updateProfile(formData);
    useToast().add({
      title: "نجاح",
      description: "تم تحديث الملف الشخصي بنجاح",
      color: "green",
    });
  } catch (error) {
    console.error("Profile update failed:", error);
    useToast().add({
      title: "خطأ",
      description: "فشل تحديث الملف الشخصي",
      color: "red",
    });
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

const handleLogout = () => {
  auth.logout();
  navigateTo("/auth/login");
};

definePageMeta({
  middleware: ["auth"],
});
</script>
