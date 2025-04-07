"use client";

import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  sendMagicLink,
  signIn,
  signInWithGitHub,
} from "@/lib/actions/auth.action";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { authClient } from "../auth-client";

const initialState = {
  success: false,
  error: undefined,
  fieldErrors: undefined,
};

export function SignInForm() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  if (session) {
    redirect("/dashboard");
  }

  const [state, formAction] = useActionState(signIn, initialState);
  const [magicLinkState, magicLinkAction] = useActionState(
    sendMagicLink,
    initialState
  );

  // Afficher les erreurs ou les messages de succès via Sonner toast
  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (magicLinkState.message) {
      toast.success(magicLinkState.message);
    }
    if (magicLinkState.error) {
      toast.error(magicLinkState.error);
    }
  }, [state.error, magicLinkState.message, magicLinkState.error]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">Connexion</h1>
        <p className="text-sm text-muted-foreground text-center">
          Connectez-vous à votre compte
        </p>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="votre@email.com"
              required
            />
            {state.fieldErrors?.email && (
              <FormMessage>{state.fieldErrors.email[0]}</FormMessage>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
            {state.fieldErrors?.password && (
              <FormMessage>{state.fieldErrors.password[0]}</FormMessage>
            )}
          </div>

          <div className="flex items-center justify-between">
            <input type="hidden" name="email" id="magic-email" />
            <Button
              variant="link"
              className="px-0"
              type="submit"
              onClick={(e) => {
                // Copier la valeur de l'email du formulaire principal
                const emailInput = document.getElementById(
                  "email"
                ) as HTMLInputElement;
                const magicEmailInput = document.getElementById(
                  "magic-email"
                ) as HTMLInputElement;
                if (emailInput && magicEmailInput) {
                  magicEmailInput.value = emailInput.value;
                }
              }}
            >
              Se connecter avec un lien magique
            </Button>

            <Button variant="link" className="px-0" type="button" asChild>
              <Link href="/auth/forgot-password">Mot de passe oublié ?</Link>
            </Button>
          </div>

          <SubmitButton className="w-full">Se connecter</SubmitButton>
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

        <form
          action={async (formData) => {
            await signInWithGitHub();
          }}
        >
          <Button variant="outline" type="submit" className="w-full">
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
        </form>
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
  );
}
