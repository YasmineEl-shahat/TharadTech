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
    <VeeForm @submit="handleUpdateProfile" v-slot="{ errors }">
      <div
        class="bg-white shadow-md rounded-lg p-6 sm:p-10 py-15 lg:px-20 flex flex-col space-y-6"
      >
        <!-- Full Name Field -->
        <UFormGroup name="name">
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
        </UFormGroup>

        <!-- Email Field -->
        <UFormGroup name="email">
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
        </UFormGroup>

        <!-- Profile Picture Upload -->
        <div>
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
        </div>

        <!-- Old Password Field -->
        <UFormGroup name="old_password">
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
        </UFormGroup>

        <!-- New Password Field -->
        <UFormGroup name="new_password">
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
        </UFormGroup>

        <!-- Confirm New Password Field -->
        <UFormGroup name="confirm_new_password">
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

const auth = useAuthStore();
const { user, loading } = storeToRefs(auth);
const selectedFile = ref<File | null>(null);
const showOldPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmNewPassword = ref(false);

const handleUpdateProfile = async (values: any) => {
  try {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("old_password", values.old_password || "");
    formData.append("new_password", values.new_password || "");
    formData.append("confirm_new_password", values.confirm_new_password || "");
    if (selectedFile.value) {
      formData.append("profile_picture", selectedFile.value);
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
    console.log("File selected:", file);
  }
};

const handleLogout = () => {
  auth.logout();
  navigateTo("/auth/login");
};

definePageMeta({
  middleware: ["auth"],
});
</script>
