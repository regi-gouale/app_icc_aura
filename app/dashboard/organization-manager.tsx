import { Card, CardContent } from "@/components/ui/card";
import { CreateOrganizationForm } from "./components/create-organization-form";
import { JoinOrganizationForm } from "./components/join-organization-form";

interface OrganizationManagerProps {
  userRole: string;
}

export function OrganizationManager({ userRole }: OrganizationManagerProps) {
  return (
    <div>
      {userRole === "admin" ? (
        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              Créer une nouvelle organisation
            </h3>
            <CreateOrganizationForm />
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              Rejoindre une organisation
            </h3>
            <JoinOrganizationForm />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
