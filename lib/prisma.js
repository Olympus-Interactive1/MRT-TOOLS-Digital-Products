import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not configured.");

const adapter = new PrismaPg({ connectionString });
const globalForPrisma = globalThis;
export const db = globalForPrisma.__mrtPrisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.__mrtPrisma = db;
