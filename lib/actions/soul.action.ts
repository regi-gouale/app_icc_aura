"use server";

import { prisma } from "@/lib/prisma";
import { SoulStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

type CreateSoulParams = {
  firstName: string;
  lastName: string;
  gender?: string;
  ageRange?: string;
  maritalStatus?: string;
  dateOfBirth?: Date;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  profession?: string;
  description?: string;
  status: string;
  organizationId: string;
};

export async function createSoul(data: CreateSoulParams) {
  try {
    const newSoul = await prisma.soul.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        ageRange: data.ageRange,
        maritalStatus: data.maritalStatus,
        dateOfBirth: data.dateOfBirth,
        phone: data.phone,
        email: data.email,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        profession: data.profession,
        description: data.description,
        status: data.status as SoulStatus,
        OrganizationId: data.organizationId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    revalidatePath(`/orgs/[slug]/souls`);

    return {
      success: true,
      data: newSoul,
    };
  } catch (error) {
    return {
      success: false,
      error: "Échec de la création de l'âme",
    };
  }
}
