import { auth } from "@/lib/auth";
import { getSession, getUser } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import { type Organization, type User } from "@prisma/client";
import { headers } from "next/headers";
import { cache } from "react";

/**
 * Cache pour la session
 */
export const getSessionCache = cache(async () => {
  const session = await getSession();
  return session;
});

/**
 * Cache pour l'utilisateur
 */
export const getUserCache = cache(async () => {
  const user = await getUser();
  return user;
});

/**
 * Cache pour l'organisation active
 */
export const getActiveOrganizationCache = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.activeOrganizationId) {
    return null;
  }

  const organization = await prisma.organization.findUnique({
    where: {
      id: session.session.activeOrganizationId,
    },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
  });

  return organization;
});

/**
 * Cache pour les organisations de l'utilisateur
 */
export const getUserOrganizationsCache = cache(
  async (userId: User["id"]): Promise<Organization[]> => {
    const organizations = await prisma.organization.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return organizations;
  }
);

/**
 * Cache pour une organisation spécifique
 */
export const getOrganizationByIdCache = cache(
  async (organizationId: Organization["id"]) => {
    const organization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return organization;
  }
);
export const getOrganizationBySlugCache = cache(
  async (organizationSlug: string) => {
    console.log("Fetching organization by slug:", organizationSlug);
    const organization = await prisma.organization.findFirst({
      where: {
        slug: organizationSlug,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return organization;
  }
);

/**
 * Cache pour les membres d'une organisation
 */
export const getOrganizationMembersCache = cache(
  async (organizationId: Organization["id"]) => {
    const members = await prisma.member.findMany({
      where: {
        organizationId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return members;
  }
);
