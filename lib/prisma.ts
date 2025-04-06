import { PrismaClient } from "@prisma/client";

// Define the type for global prisma
type GlobalWithPrisma = {
  prisma: PrismaClient;
};

const globalForPrisma = global as unknown as GlobalWithPrisma;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
