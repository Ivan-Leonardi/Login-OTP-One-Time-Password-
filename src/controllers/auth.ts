import { RequestHandler } from "express";
import { authSigninSchema } from "../schemas/auth-signin";
import { authSignUpSchema } from "../schemas/auth-signup";
import { createUser, getUserByEmail } from "../services/user";
import { generateOTP, validateOTP } from "../services/otp";
import { sendEmail } from "../utils/mailtrap";
import { authUseOTPSchema } from "../schemas/auth-useotp";
import { createJWT } from "../utils/jwt";

export const signin: RequestHandler = async (req, res) => {
    //validando os dados recebidos
    const data = authSigninSchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }

    //verificando pelo email se o usuário existe
    const user = await getUserByEmail(data.data.email);

    if (!user) {
        res.json({ error: "Usuário não encontrado" });
        return;
    }

    //gerando um código otp para o usuário
    const otp = await generateOTP(user.id);

    //enviando o email para o usuário
    await sendEmail(
        user.email,
        "Seu código de acesso é: " + otp.code,
        "Digite seu código: " + otp.code,
        
    );

    //devolvendo o id do código OTP
    res.json({
        id: otp.id,
    });
};

export const signup: RequestHandler = async (req, res) => {
    //validando os dados recebidos
    const data = authSignUpSchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }

    //verificando se o email já está em uso
    const user = await getUserByEmail(data.data.email);

    if (user) {
        res.json({ error: "Este email já esta em uso!" });
        return;
    }

    //criando o usuário
    const newUser = await createUser(data.data.name, data.data.email);

    //retornando os dados do usuário recem criado
    res.status(201).json({ user: newUser });
};

export const useOTP: RequestHandler = async (req, res) => {
    //validando os dados recebidos
    const data = authUseOTPSchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }

    //validando o OTP
    const user = await validateOTP(data.data.id, data.data.code);

    if (!user) {
        res.json({ error: "OTP inválido ou expirado!" });
        return;
    }

    //criando o JWT
    const token = createJWT(user.id);

    //retornando o JWT
    res.json({ token, user });
};
