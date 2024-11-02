import { z } from "zod";

export const authSigninSchema = z.object({
    email: z
        .string({ message: "Campo email é obrigatório" })
        .email("Email inválido!"),
});
