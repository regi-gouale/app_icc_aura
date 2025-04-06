"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
        "Le mot de passe doit contenir au moins une lettre et un chiffre"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: ResetPasswordSchema) => {
    if (!token) {
      setError("Token de réinitialisation manquant.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await authClient.resetPassword({
        token,
        newPassword: data.password,
      });
      router.push(
        "/auth/signin?message=Votre mot de passe a été réinitialisé avec succès !"
      );
    } catch (err) {
      setError(
        "Une erreur s'est produite lors de la réinitialisation du mot de passe."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold text-center text-red-500">
              Erreur
            </h1>
          </CardHeader>
          <CardContent>
            <p className="text-center">
              Le lien de réinitialisation est invalide ou a expiré. Veuillez
              demander un nouveau lien.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">
            Nouveau mot de passe
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Veuillez choisir un nouveau mot de passe
          </p>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-6 p-4 text-sm text-red-500 bg-red-100 dark:bg-red-900/30 rounded-md">
              {error}
            </div>
          )}

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="password">Nouveau mot de passe</Label>
              <Input
                {...form.register("password")}
                id="password"
                type="password"
                placeholder="••••••••"
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                {...form.register("confirmPassword")}
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              {loading
                ? "Réinitialisation en cours..."
                : "Réinitialiser le mot de passe"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
