"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

interface OrganizationDetailsProps {
  organization: any;
  isAdmin: boolean;
  userId: string;
}

export function OrganizationDetails({
  organization,
  isAdmin,
  userId,
}: OrganizationDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(organization.name || "");
  const [logo, setLogo] = useState(organization.logo || "");
  const [slug, setSlug] = useState(organization.slug || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("Le nom de l'organisation est obligatoire");
      return;
    }

    setIsUpdating(true);
    try {
      await authClient.organization.update({
        data: {
          name: name.trim(),
          logo: logo.trim() || undefined,
          slug: slug.trim() || undefined,
        },
        organizationId: organization.id,
      });

      toast.success("Organisation mise à jour avec succès");
      setIsEditing(false);
      // Recharger la page pour afficher les modifications
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'organisation:", error);
      toast.error("Erreur lors de la mise à jour de l'organisation");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    // Réinitialiser les valeurs et quitter le mode édition
    setName(organization.name || "");
    setLogo(organization.logo || "");
    setSlug(organization.slug || "");
    setIsEditing(false);
  };

  if (isEditing && isAdmin) {
    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Modifier l'organisation
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nom de l'organisation</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
                placeholder="Nom de l'organisation"
              />
            </div>

            <div>
              <Label htmlFor="slug">Identifiant unique (slug)</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="mt-1"
                placeholder="identifiant-unique"
              />
              <p className="text-xs text-gray-500 mt-1">
                Modifier le slug peut affecter les URLs existantes
              </p>
            </div>

            <div>
              <Label htmlFor="logo">URL du logo</Label>
              <Input
                id="logo"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                className="mt-1"
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isUpdating}
              >
                Annuler
              </Button>
              <Button onClick={handleUpdate} disabled={isUpdating}>
                {isUpdating
                  ? "Mise à jour..."
                  : "Enregistrer les modifications"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Détails de l'organisation</h2>
          {isAdmin && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Modifier
            </Button>
          )}
        </div>
        <div className="space-y-4">
          {organization.logo && (
            <div className="flex justify-center mb-6">
              <img
                src={organization.logo}
                alt={`Logo de ${organization.name}`}
                className="h-16 w-auto object-contain"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nom</p>
              <p className="font-medium">{organization.name}</p>
            </div>

            {organization.slug && (
              <div>
                <p className="text-sm text-gray-500">Identifiant (slug)</p>
                <p className="font-medium">{organization.slug}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-500">Date de création</p>
              <p className="font-medium">
                {new Date(organization.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>

            {/* Afficher les métadonnées si elles existent */}
            {organization.metadata &&
              Object.keys(organization.metadata).length > 0 && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Métadonnées</p>
                  <pre className="bg-gray-50 p-2 rounded text-xs overflow-auto">
                    {JSON.stringify(organization.metadata, null, 2)}
                  </pre>
                </div>
              )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
