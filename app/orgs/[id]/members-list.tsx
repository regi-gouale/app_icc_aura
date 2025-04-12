"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

interface MembersListProps {
  members: any[];
  currentUserId: string;
  currentUserRole: string;
  organizationId: string;
}

export function MembersList({
  members,
  currentUserId,
  currentUserRole,
  organizationId,
}: MembersListProps) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const isOwner = currentUserRole.includes("owner");
  const isAdmin = currentUserRole.includes("admin") || isOwner;

  const handleUpdateRole = async (memberId: string, role: string) => {
    if (!isAdmin) return;

    setIsUpdating(true);
    try {
      await authClient.organization.updateMemberRole({
        memberId,
        role: newRole as "member" | "admin" | "owner",
      });

      toast.success("Rôle mis à jour avec succès");
      setSelectedMember(null);
      setNewRole("");
      // Recharger la page pour afficher les modifications
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle:", error);
      toast.error("Erreur lors de la mise à jour du rôle");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveMember = async (memberIdOrEmail: string) => {
    if (!isAdmin) return;

    if (
      !confirm("Êtes-vous sûr de vouloir retirer ce membre de l'organisation ?")
    ) {
      return;
    }

    setIsRemoving(true);
    try {
      await authClient.organization.removeMember({
        memberIdOrEmail,
        organizationId,
      });

      toast.success("Membre retiré avec succès");
      // Recharger la page pour afficher les modifications
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors du retrait du membre:", error);
      toast.error("Erreur lors du retrait du membre");
    } finally {
      setIsRemoving(false);
    }
  };

  const handleLeaveOrganization = async () => {
    if (!confirm("Êtes-vous sûr de vouloir quitter cette organisation ?")) {
      return;
    }

    setIsRemoving(true);
    try {
      await authClient.organization.leave({
        organizationId,
      });

      toast.success("Vous avez quitté l'organisation");
      // Rediriger vers le tableau de bord
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Erreur lors du départ de l'organisation:", error);
      toast.error("Erreur lors du départ de l'organisation");
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle
              </th>
              {isAdmin && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {member.user.image && (
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={member.user.image}
                          alt={member.user.name || "User"}
                        />
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {member.user.name || "Sans nom"}
                        {member.userId === currentUserId && " (Vous)"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {member.user.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {selectedMember === member.id &&
                  isAdmin &&
                  member.userId !== currentUserId ? (
                    <div className="flex items-center space-x-2">
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="">Sélectionner un rôle</option>
                        <option value="member">Membre</option>
                        <option value="admin">Admin</option>
                        {isOwner && <option value="owner">Propriétaire</option>}
                      </select>
                      <Button
                        size="sm"
                        onClick={() => handleUpdateRole(member.id, newRole)}
                        disabled={isUpdating || !newRole}
                      >
                        OK
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedMember(null)}
                      >
                        ✕
                      </Button>
                    </div>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {member.role}
                    </span>
                  )}
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {member.userId !== currentUserId ? (
                      <div className="flex justify-end gap-2">
                        {selectedMember !== member.id && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedMember(member.id);
                              setNewRole(member.role);
                            }}
                            disabled={isUpdating || isRemoving}
                          >
                            Modifier rôle
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveMember(member.id)}
                          disabled={
                            isUpdating || isRemoving || member.role === "owner"
                          }
                        >
                          Retirer
                        </Button>
                      </div>
                    ) : null}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Si l'utilisateur n'est pas propriétaire, afficher un bouton pour quitter l'organisation */}
      {!currentUserRole.includes("owner") && (
        <div className="mt-6 text-right">
          <Button
            variant="destructive"
            onClick={handleLeaveOrganization}
            disabled={isRemoving}
          >
            Quitter l'organisation
          </Button>
        </div>
      )}
    </div>
  );
}
