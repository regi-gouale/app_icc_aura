import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins/magic-link";
import { sendEmail } from "./emails/email-service";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Réinitialisation de votre mot de passe",
        templateName: "reset-password",
        variables: {
          resetLink: url,
          token,
          appName: "ICC AURA",
        },
      });
    },
    resetPasswordExpiresIn: 15, // minutes
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        await sendEmail({
          to: email,
          subject: "Lien de connexion à votre compte",
          templateName: "magic-link",
          variables: {
            magicLink: url,
            token,
            appName: "ICC AURA",
          },
        });
      },
      // Durée de validité du lien en minutes (par défaut: 10)
      expiresIn: 15,
    }),
  ],
});
