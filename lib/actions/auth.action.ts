"use server";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

/**
 * Schéma pour la validation du formulaire de connexion
 */
const signInSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

/**
 * Schéma pour la validation du formulaire d'inscription
 */
const signUpSchema = z
  .object({
    email: z.string().email("Email invalide"),
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
  })
  .refine(async (data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

/**
 * Schéma pour la validation du formulaire de réinitialisation de mot de passe
 */
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
  })
  .refine(async (data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

/**
 * Schéma pour la validation du formulaire de mot de passe oublié
 */
const forgotPasswordSchema = z.object({
  email: z.string().email("Email invalide"),
});

/**
 * Type pour les erreurs de validation
 */
export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

/**
 * Server action pour la connexion
 */
export async function signIn(
  prevState: any,
  formData: FormData
): Promise<{
  success: boolean;
  error?: string;
  fieldErrors?: FieldErrors<z.infer<typeof signInSchema>>;
}> {
  const validatedFields = await signInSchema.safeParseAsync({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await auth.api.signInEmail({
      body: {
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        // redirectTo: "/dashboard",
      },
      asResponse: true,
    });
    if (response.ok) {
      revalidatePath("/auth/signin");
      redirect("/dashboard");
    } else {
      return {
        success: false,
        error: response.statusText,
      };
    }
    // redirect("/dashboard");

    // redirect("/dashboard");

    // Ce code ne sera jamais atteint en raison du redirect
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return {
      success: false,
      error: "Échec de connexion. Veuillez vérifier vos identifiants.",
    };
  }
}

/**
 * Server action pour l'envoi d'un lien magique
 */
export async function sendMagicLink(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; message?: string; error?: string }> {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return {
      success: false,
      error: "Veuillez entrer une adresse email valide.",
    };
  }

  try {
    await auth.api.signInMagicLink({
      body: {
        email,
        callbackURL: "/dashboard",
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: "Un lien de connexion a été envoyé à votre adresse email.",
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi du lien magique:", error);
    return {
      success: false,
      error: "Une erreur s'est produite lors de l'envoi du lien magique.",
    };
  }
}

/**
 * Server action pour l'inscription
 */
export async function signUp(
  prevState: any,
  formData: FormData
): Promise<{
  success: boolean;
  error?: string;
  fieldErrors?: FieldErrors<z.infer<typeof signUpSchema>>;
}> {
  const validatedFields = await signUpSchema.safeParseAsync({
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await auth.api.signUpEmail({
      body: {
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        name: validatedFields.data.name,
        redirectTo: "/dashboard",
        role: "authenticated",
      },
      // role: "authenticated",
      asResponse: true,
    });

    if (response.ok) {
      revalidatePath("/auth/signup");
      redirect("/dashboard");
    } else {
      return {
        success: false,
        error: response.statusText,
      };
    }

    // Ce code ne sera jamais atteint en raison du redirect
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return {
      success: false,
      error: "Une erreur s'est produite lors de l'inscription.",
    };
  }
}

/**
 * Server action pour la réinitialisation du mot de passe
 */
export async function resetPassword(
  token: string,
  prevState: any,
  formData: FormData
): Promise<{
  success: boolean;
  error?: string;
  fieldErrors?: FieldErrors<z.infer<typeof resetPasswordSchema>>;
}> {
  const validatedFields = await resetPasswordSchema.safeParseAsync({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (!token) {
    return {
      success: false,
      error: "Token de réinitialisation manquant.",
    };
  }

  try {
    await authClient.resetPassword({
      token,
      newPassword: validatedFields.data.password,
    });

    redirect("/auth/signin");

    // Ce code ne sera jamais atteint en raison du redirect
    // return { success: true };
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    return {
      success: false,
      error:
        "Une erreur s'est produite lors de la réinitialisation du mot de passe.",
    };
  }
}

/**
 * Server action pour la demande de réinitialisation du mot de passe
 */
export async function forgotPassword(
  prevState: any,
  formData: FormData
): Promise<{
  success: boolean;
  error?: string;
  fieldErrors?: FieldErrors<z.infer<typeof forgotPasswordSchema>>;
}> {
  const validatedFields = await forgotPasswordSchema.safeParseAsync({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await authClient.forgetPassword({
      email: validatedFields.data.email,
      redirectTo: "/auth/reset-password",
    });

    return { success: true };
  } catch (error) {
    console.error(
      "Erreur lors de la demande de réinitialisation du mot de passe:",
      error
    );
    return {
      success: false,
      error: "Une erreur s'est produite. Veuillez réessayer plus tard.",
    };
  }
}

/**
 * Server action pour l'authentification via GitHub
 */
export async function signInWithGitHub() {
  try {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
    return Promise<{
      success: true;
      message: "Redirection vers GitHub...";
    }>;
  } catch (error) {
    console.error("Erreur lors de la connexion avec GitHub:", error);
    return {
      success: false,
      error: "Une erreur s'est produite lors de la connexion avec GitHub.",
    };
  }
}

/**
 * Server action pour la déconnexion
 */
export async function signOut(): Promise<void> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    redirect("/auth/signin");
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    throw error;
  }
}
