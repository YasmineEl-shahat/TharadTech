import { defineStore } from "pinia";
import { z } from "zod";
import { useApi } from "../composables/useApi";
import { loginSchema, registerSchema, otpSchema } from "./auth.schemas";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export const useAuthStore = defineStore("auth", () => {
  const { apiFetch } = useApi();
  const token = useCookie("auth_token");

  const state = reactive<AuthState>({
    user: null,
    isAuthenticated: !!token.value,
    loading: false,
  });

  const login = async (credentials: z.infer<typeof loginSchema>) => {
    state.loading = true;
    try {
      const { data } = await apiFetch<{ token: string }>("/auth/login", {
        method: "POST",
        body: credentials,
      });
      if (data.value?.token) {
        token.value = data.value.token;
        state.isAuthenticated = true;
        await fetchUser();
      }
    } finally {
      state.loading = false;
    }
  };

  const register = async (userData: FormData) => {
    state.loading = true;
    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: userData, // FormData is directly passed here
        headers: {
          // Do not set Content-Type; the browser will set it automatically for FormData
        },
      });
    } finally {
      state.loading = false;
    }
  };
  const verifyOtp = async (
    otpData: z.infer<typeof otpSchema> & { email: string }
  ) => {
    state.loading = true;
    try {
      const query = new URLSearchParams({
        email: otpData.email,
        otp: otpData.otp,
      }).toString();

      const { data } = await apiFetch<{ token: string }>(`/otp?${query}`, {
        method: "GET",
      });

      if (data.value?.token) {
        token.value = data.value.token;
        state.isAuthenticated = true;
        await fetchUser();
      }
    } finally {
      state.loading = false;
    }
  };

  const fetchUser = async () => {
    if (!token.value) return;

    state.loading = true;
    try {
      const { data } = await apiFetch<{ user: User }>("/auth/user");
      if (data.value?.user) {
        state.user = data.value.user;
      }
    } finally {
      state.loading = false;
    }
  };

  const updateProfile = async (profileData: FormData) => {
    state.loading = true;
    try {
      const { data } = await apiFetch<{ user: User }>("/auth/profile", {
        method: "PUT",
        body: profileData,
      });
      if (data.value?.user) {
        state.user = data.value.user;
      }
    } finally {
      state.loading = false;
    }
  };

  const logout = () => {
    token.value = null;
    state.user = null;
    state.isAuthenticated = false;
    navigateTo("/auth/login");
  };

  return {
    ...toRefs(state),
    loginSchema,
    registerSchema,
    otpSchema,
    login,
    register,
    verifyOtp,
    updateProfile,
    logout,
  };
});
