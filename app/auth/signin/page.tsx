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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

type SignInSchema = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: SignInSchema) => {
    setLoading(true);
    setError(null);

    try {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      toast.success("Connexion réussie !");
      router.push("/");
    } catch (err) {
      toast.error("Email ou mot de passe incorrect");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    const email = form.getValues("email");
    if (!email) {
      setError("Veuillez entrer votre email pour recevoir un lien magique.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await authClient.signIn.magicLink({ email, callbackURL: "/" });
      setError(null);
      alert("Un lien de connexion a été envoyé à votre adresse email.");
    } catch (err) {
      setError("Une erreur s'est produite lors de l'envoi du lien magique.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Connexion</h1>
          <p className="text-sm text-muted-foreground text-center">
            Connectez-vous à votre compte
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

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
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

            <div className="flex items-center justify-between">
              <Button
                variant="link"
                className="px-0"
                type="button"
                onClick={handleMagicLink}
              >
                Se connecter avec un lien magique
              </Button>
              <Button variant="link" className="px-0" type="button" asChild>
                <Link href="/auth/forgot-password">Mot de passe oublié ?</Link>
              </Button>
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continuer avec
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={() =>
              authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
              })
            }
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Button variant="link" className="px-0" asChild>
              <Link href="/auth/signup">S'inscrire</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
