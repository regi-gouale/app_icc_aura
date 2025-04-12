"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    slugCheckTimeout?: number;
  }
}

export function CreateOrganizationForm() {
  const [orgName, setOrgName] = useState("");
  const [orgSlug, setOrgSlug] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);

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

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value;
    setOrgSlug(slug);

    if (window.slugCheckTimeout) {
      clearTimeout(window.slugCheckTimeout);
    }

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
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la création de l'organisation:", error);
      toast.error(
        "Erreur lors de la création de l'organisation. Veuillez réessayer."
      );
    } finally {
      setIsCreating(false);
    }
  };

  return (
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
        disabled={isCreating || (slugAvailable === false && orgSlug !== "")}
        className="w-full"
      >
        {isCreating ? "Création en cours..." : "Créer l'organisation"}
      </Button>
    </div>
  );
}
