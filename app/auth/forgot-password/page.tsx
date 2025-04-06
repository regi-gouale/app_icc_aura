"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Email invalide"),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: ForgotPasswordSchema) => {
    setLoading(true);
    setError(null);

    try {
      await authClient.forgetPassword({
        email: data.email,
        redirectTo: "/auth/reset-password",
      });
      setSuccess(true);
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer plus tard.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Email envoyé !</h2>
              <p className="text-muted-foreground">
                Si un compte existe avec cette adresse email, vous recevrez un
                lien pour réinitialiser votre mot de passe.
              </p>
              <Button asChild className="mt-4">
                <Link href="/auth/signin">Retour à la connexion</Link>
              </Button>
            </div>
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
            Mot de passe oublié
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Entrez votre email pour recevoir un lien de réinitialisation
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
              <Label htmlFor="email">Email</Label>
              <Input
                {...form.register("email")}
                id="email"
                type="email"
                placeholder="votre@email.com"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Envoi en cours..." : "Envoyer le lien"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/auth/signin">Retour à la connexion</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
