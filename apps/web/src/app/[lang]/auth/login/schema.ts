import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email({ message: "Insira um e-mail válido." }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
