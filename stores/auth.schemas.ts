import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("البريد الإلكتروني مطلوب")
    .email("صيغة البريد الإلكتروني غير صحيحة"),
  password: z
    .string()
    .nonempty("كلمة المرور مطلوبة")
    .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
    email: z.string().email("صيغة البريد الإلكتروني غير صحيحة"),
    password: z.string().min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل"),
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
    message: "كلمة المرور غير متطابقة",
    path: ["password_confirmation"],
  });

export const otpSchema = z.object({
  otp: z.string().length(5, "رمز التحقق يجب أن يكون 5 أرقام"),
});

export const profileSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("صيغة البريد الإلكتروني غير صحيحة"),
  old_password: z.string().optional(),
  new_password: z
    .string()
    .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
    .optional(),
  confirm_new_password: z.string().optional(),
  image: z.any().optional(),
});
