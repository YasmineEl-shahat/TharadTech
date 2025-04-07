<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
          <p class="mt-1 text-sm text-gray-600">
            Update your personal information
          </p>
        </div>
      </div>

      <div class="mt-5 md:mt-0 md:col-span-2">
        <VeeForm @submit="handleUpdateProfile" v-slot="{ errors }">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-4">
                  <UFormGroup label="Full name" name="name">
                    <VeeField
                      name="name"
                      :value="user?.name"
                      v-slot="{ field, errors }"
                    >
                      <UInput
                        v-bind="field"
                        :error="errors[0]"
                        placeholder="Enter your full name"
                      />
                    </VeeField>
                  </UFormGroup>
                </div>

                <div class="col-span-6 sm:col-span-4">
                  <UFormGroup label="Email address" name="email">
                    <VeeField
                      name="email"
                      :value="user?.email"
                      v-slot="{ field, errors }"
                    >
                      <UInput
                        v-bind="field"
                        :error="errors[0]"
                        placeholder="Enter your email"
                        type="email"
                        disabled
                      />
                    </VeeField>
                  </UFormGroup>
                </div>

                <div class="col-span-6 sm:col-span-4">
                  <UFormGroup label="Phone number" name="phone">
                    <VeeField
                      name="phone"
                      :value="user?.phone"
                      v-slot="{ field, errors }"
                    >
                      <UInput
                        v-bind="field"
                        :error="errors[0]"
                        placeholder="Enter your phone number"
                        type="tel"
                      />
                    </VeeField>
                  </UFormGroup>
                </div>
              </div>
            </div>

            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <UButton type="submit" color="primary" :loading="loading">
                Save changes
              </UButton>
            </div>
          </div>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";

const auth = useAuthStore();
const { user, loading } = storeToRefs(auth);

const handleUpdateProfile = async (values: any) => {
  try {
    await auth.updateProfile(values);
    useToast().add({
      title: "Success",
      description: "Profile updated successfully",
      color: "green",
    });
  } catch (error) {
    console.error("Profile update failed:", error);
    useToast().add({
      title: "Error",
      description: "Failed to update profile",
      color: "red",
    });
  }
};

definePageMeta({
  middleware: ["auth"],
});
</script>
