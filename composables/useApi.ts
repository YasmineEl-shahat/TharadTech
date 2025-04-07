import type { UseFetchOptions } from "nuxt/app";

export const useApi = () => {
  const config = useRuntimeConfig();
  const token = useCookie("auth_token");

  const apiFetch = async <T>(url: string, options: UseFetchOptions<T> = {}) => {
    const defaults: UseFetchOptions<T> = {
      baseURL: config.public.apiBase as string,
      key: url,
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
      onResponse(_ctx) {
        const response = _ctx.response;
        if (response.status === 401) {
          token.value = null;
          navigateTo("/auth/login");
        }
      },
      ...options,
    };

    try {
      return await useFetch(url, defaults);
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "API Error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  return {
    apiFetch,
  };
};
