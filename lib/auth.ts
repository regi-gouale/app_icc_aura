import { sendEmail } from "@/lib/emails/email-service";
import { prisma } from "@/lib/prisma";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins/admin";
import { magicLink } from "better-auth/plugins/magic-link";
import { organization } from "better-auth/plugins/organization";

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
    admin(),
    organization({
      allowUserToCreateOrganization: async (user) => {
        const userRole = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });
        if (!userRole) {
          throw new Error("User not found");
        }
        return userRole.role === "admin" || userRole.role === "owner";
      },
      organizationCreation: {
        disabled: false,
      },
      async sendInvitationEmail(data) {
        const inviteLink = `${process.env.BETTER_AUTH_URL}/accept-invitation/${data.id}`;
        sendEmail({
          to: data.email,
          subject: "Invitation à rejoindre l'organisation",
          templateName: "organization-invitation",
          variables: {
            invitedByUsername: data.inviter.user.name,
            invitedByEmail: data.inviter.user.email,
            teamName: data.organization.name,
            inviteLink,
          },
        });
      },
    }),
    nextCookies(),
  ],
});
