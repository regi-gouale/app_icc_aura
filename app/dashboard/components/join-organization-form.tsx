"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

export function JoinOrganizationForm() {
  const [invitationCode, setInvitationCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinOrganization = async () => {
    if (!invitationCode.trim()) {
      toast.error("Veuillez saisir un code d'invitation");
      return;
    }

    setIsJoining(true);

    try {
      await authClient.organization.acceptInvitation({
        invitationId: invitationCode,
      });

      toast.success("Vous avez rejoint l'organisation avec succès");
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'adhésion à l'organisation:", error);
      toast.error("Code d'invitation invalide ou expiré");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="invitationCode">Code d'invitation</Label>
        <Input
          id="invitationCode"
          value={invitationCode}
          onChange={(e) => setInvitationCode(e.target.value)}
          placeholder="Entrez le code d'invitation"
          className="mt-1"
        />
        <p className="text-xs text-gray-500 mt-1">
          Entrez le code d'invitation que vous avez reçu par email pour
          rejoindre une organisation.
        </p>
      </div>

      <Button
        onClick={handleJoinOrganization}
        disabled={isJoining}
        className="w-full"
      >
        {isJoining ? "Adhésion en cours..." : "Rejoindre l'organisation"}
      </Button>
    </div>
  );
}
