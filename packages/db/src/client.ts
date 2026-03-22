import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

function loadDatabaseUrlFromFallbackEnv() {
  if (process.env.DATABASE_URL) {
    return;
  }

  const candidates = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), ".env.local"),
    path.resolve(process.cwd(), "../../packages/db/.env"),
    path.resolve(process.cwd(), "../../packages/db/.env.local"),
    path.resolve(process.cwd(), "packages/db/.env"),
    path.resolve(process.cwd(), "packages/db/.env.local"),
  ];

  for (const envPath of candidates) {
    if (!fs.existsSync(envPath)) {
      continue;
    }

    dotenv.config({ path: envPath, override: false });
    if (process.env.DATABASE_URL) {
      return;
    }
  }
}

loadDatabaseUrlFromFallbackEnv();

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma: ReturnType<typeof prismaClientSingleton> =
  globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
