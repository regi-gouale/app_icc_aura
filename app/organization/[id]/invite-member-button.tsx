"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

interface InviteMemberButtonProps {
  organizationId: string;
}

export function InviteMemberButton({
  organizationId,
}: InviteMemberButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"member" | "admin" | "owner">("member");
  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = async () => {
    if (!email.trim()) {
      toast.error("L'adresse email est requise");
      return;
    }

    // Validation basique de l'email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Veuillez entrer une adresse email valide");
      return;
    }

    setIsInviting(true);
    try {
      await authClient.organization.inviteMember({
        email: email.trim(),
        role,
        organizationId,
      });

      toast.success(`Invitation envoyée à ${email}`);
      setIsOpen(false);
      setEmail("");
      setRole("member");
    } catch (error: any) {
      console.error("Erreur lors de l'envoi de l'invitation:", error);
      const errorMessage =
        error?.message || "Erreur lors de l'envoi de l'invitation";
      toast.error(errorMessage);
    } finally {
      setIsInviting(false);
    }
  };

  if (!isOpen) {
    return <Button onClick={() => setIsOpen(true)}>Inviter un membre</Button>;
  }

  return (
    <Card className="border-2 border-dashed border-gray-300 p-4">
      <CardContent className="p-0 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Inviter un nouveau membre</h3>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            ✕
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemple.fr"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="role">Rôle</Label>
            <select
              id="role"
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "member" | "admin" | "owner")
              }
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md mt-1"
            >
              <option value="member">Membre</option>
              <option value="admin">Administrateur</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Les membres peuvent consulter. Les administrateurs peuvent gérer
              les membres et les paramètres.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isInviting}
            >
              Annuler
            </Button>
            <Button onClick={handleInvite} disabled={isInviting}>
              {isInviting ? "Envoi en cours..." : "Envoyer l'invitation"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
