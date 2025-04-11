import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string(),
    image: z
      .any()
      .refine(
        (file) =>
          file instanceof File &&
          ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
        {
          message: "Only JPEG, JPG and PNG files are allowed",
          path: ["image"],
        }
      )
      .refine((file) => file instanceof File && file.size <= 5 * 1024 * 1024, {
        message: "File size must not exceed 5MB",
        path: ["image"],
      }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});
