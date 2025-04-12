import { auth } from "@/lib/auth";
import type { AuthPermission } from "@/lib/auth/auth-permissions";
import { headers } from "next/headers";

export const hasPermission = async (permission: AuthPermission) => {
  const result = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permission,
    },
  });

  return result.success;
};
