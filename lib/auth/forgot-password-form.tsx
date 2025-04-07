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
import { forgotPassword } from "@/lib/actions/auth.action";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const initialState = {
  success: false,
  error: undefined,
  fieldErrors: undefined,
};

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(forgotPassword, initialState);
  const [success, setSuccess] = useState(false);

  // Afficher les erreurs via Sonner toast et gérer le succès
  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.success) {
      setSuccess(true);
      toast.success("Email envoyé ! Vérifiez votre boîte de réception.");
    }
  }, [state.error, state.success]);

  if (success) {
    return (
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
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">Mot de passe oublié</h1>
        <p className="text-sm text-muted-foreground text-center">
          Entrez votre email pour recevoir un lien de réinitialisation
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

          <SubmitButton className="w-full">Envoyer le lien</SubmitButton>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button variant="link" asChild>
          <Link href="/auth/signin">Retour à la connexion</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
