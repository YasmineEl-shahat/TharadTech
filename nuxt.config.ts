// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-04-07",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    scanPageMeta: true,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    [
      "@nuxt/ui",
      {
        icons: {
          heroicons: true,
        },
      },
    ],
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
        componentNames: {
          Form: "VeeForm",
          Field: "VeeField",
          FieldArray: "VeeFieldArray",
          ErrorMessage: "VeeErrorMessage",
        },
      },
    ],
  ],
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      apiBase: "https://api.tharadtech.com/api",
    },
  },
  imports: {
    autoImport: true,
    imports: [
      {
        from: "pinia",
        name: "defineStore",
      },
      {
        from: "pinia",
        name: "storeToRefs",
      },
    ],
  },
});
