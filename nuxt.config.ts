// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  compatibilityDate: "2025-04-07",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    scanPageMeta: true,
  },
  alias: {
    "@": fileURLToPath(new URL("./", import.meta.url)),
  },
  modules: [
    // "@nuxtjs/tailwindcss",
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
  css: ["@/assets/css/main.css"],

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {},
    },
  },
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
