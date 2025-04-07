"use client";

import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/lib/actions/auth.action";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState = {
  success: false,
  error: undefined,
  fieldErrors: undefined,
};

interface ResetPasswordFormProps {
  token: string | null;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  // Créer un bind de l'action resetPassword avec le token
  const resetPasswordWithToken = (prevState: any, formData: FormData) =>
    resetPassword(token || "", prevState, formData);

  const [state, formAction] = useActionState(
    resetPasswordWithToken,
    initialState
  );

  // Afficher les erreurs via Sonner toast
  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  if (!token) {
    return (
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
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">Nouveau mot de passe</h1>
        <p className="text-sm text-muted-foreground text-center">
          Veuillez choisir un nouveau mot de passe
        </p>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">Nouveau mot de passe</Label>
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
            />
            {state.fieldErrors?.confirmPassword && (
              <FormMessage>{state.fieldErrors.confirmPassword[0]}</FormMessage>
            )}
          </div>

          <SubmitButton className="w-full">
            Réinitialiser le mot de passe
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
