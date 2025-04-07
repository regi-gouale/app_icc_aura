"use client";

import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    slugCheckTimeout?: number;
  }
}
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

interface OrganizationManagerProps {
  userRole: string;
}

export function OrganizationManager({ userRole }: OrganizationManagerProps) {
  const [orgName, setOrgName] = useState("");
  const [orgSlug, setOrgSlug] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);

  // Vérifier si le slug est disponible quand l'utilisateur arrête de taper pendant 500ms
  const checkSlugAvailability = async (slug: string) => {
    if (!slug.trim()) {
      setSlugAvailable(null);
      return;
    }

    setIsCheckingSlug(true);
    try {
      const response = await authClient.organization.checkSlug({
        slug: slug,
      });
      if (response.data?.status === true) {
        setSlugAvailable(true);
      } else {
        setSlugAvailable(false);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du slug:", error);
      setSlugAvailable(false);
    } finally {
      setIsCheckingSlug(false);
    }
  };

  // Utiliser un debounce pour vérifier le slug
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value;
    setOrgSlug(slug);

    // Annuler tout debounce précédent
    if (window.slugCheckTimeout) {
      clearTimeout(window.slugCheckTimeout);
    }

    // Configurer un nouveau debounce
    window.slugCheckTimeout = setTimeout(() => {
      checkSlugAvailability(slug);
    }, 500) as unknown as number;
  };

  const handleCreateOrganization = async () => {
    if (!orgName.trim()) {
      toast.error("Veuillez saisir un nom d'organisation");
      return;
    }

    setIsCreating(true);

    try {
      await authClient.organization.create({
        name: orgName,
        slug: orgSlug.trim(),
      });

      toast.success("Organisation créée avec succès");
      window.location.reload(); // Recharger la page pour rediriger vers l'organisation
    } catch (error) {
      console.error("Erreur lors de la création de l'organisation:", error);
      toast.error(
        "Erreur lors de la création de l'organisation. Veuillez réessayer."
      );
    } finally {
      setIsCreating(false);
    }
  };

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
      window.location.reload(); // Recharger la page pour rediriger vers l'organisation
    } catch (error) {
      console.error("Erreur lors de l'adhésion à l'organisation:", error);
      toast.error("Code d'invitation invalide ou expiré");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div>
      {userRole === "admin" ? (
        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              Créer une nouvelle organisation
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="orgName">Nom de l'organisation *</Label>
                <Input
                  id="orgName"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Ex: Ma Société"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="orgSlug">Identifiant unique (slug)</Label>
                <Input
                  id="orgSlug"
                  value={orgSlug}
                  onChange={handleSlugChange}
                  placeholder="Ex: ma-societe"
                  className="mt-1"
                />
                <div className="text-xs mt-1">
                  {isCheckingSlug ? (
                    <p className="text-gray-500">Vérification du slug...</p>
                  ) : slugAvailable === true ? (
                    <p className="text-green-600">✓ Ce slug est disponible</p>
                  ) : slugAvailable === false ? (
                    <p className="text-red-600">✗ Ce slug est déjà utilisé</p>
                  ) : (
                    <p className="text-gray-500">
                      Utilisé dans les URLs. Laissez vide pour une génération
                      automatique.
                    </p>
                  )}
                </div>
              </div>

              <Button
                onClick={handleCreateOrganization}
                disabled={
                  isCreating || (slugAvailable === false && orgSlug !== "")
                }
                className="w-full"
              >
                {isCreating ? "Création en cours..." : "Créer l'organisation"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              Rejoindre une organisation
            </h3>
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
                {isJoining
                  ? "Adhésion en cours..."
                  : "Rejoindre l'organisation"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
